<?php
namespace NewfoldLabs\WP\Module\Onboarding\Services;

use NewfoldLabs\WP\Module\Onboarding\Data\Options;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows\Flows;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\Onboarding\Data\Flows\Upgrades\UpgradeHandler;

/**
 * Class FlowService
 */
class FlowService {

	/**
	 * Initialize Flow Data on refresh.
	 *
	 * @return boolean
	 */
	public static function initialize_flow_data() {
		$default_flow_data = self::get_default_flow_data();
		$flow_data         = self::read_flow_data_from_wp_option();

		if ( ! ( $flow_data ) ) {
			return \update_option( Options::get_option_name( 'flow' ), $default_flow_data );
		}

		if ( ! isset( $flow_data['version'] ) || strcmp( $flow_data['version'], $default_flow_data['version'] ) !== 0 ) {
			UpgradeHandler::maybe_upgrade( $flow_data['version'], $default_flow_data['version'] );
			$updated_flow_data = self::update_flow_data_recursive( $default_flow_data, $flow_data );
			// To update the options with the recent version of flow data
			$updated_flow_data['version'] = $default_flow_data['version'];
			return \update_option( Options::get_option_name( 'flow' ), $updated_flow_data );
		}

		return false;
	}

	/**
	 * Default Blueprint Data set based on the flow type.
	 *
	 * @return array
	 */
	public static function get_default_flow_data() {
		// check if data is available in the database if not then fetch the default dataset
		$flow_data              = Flows::get_data();
		$flow_data['createdAt'] = time();
		// get current flow type
		$flow_type = Data::current_flow();
		// update default data if flow type is ecommerce
		if ( 'ecommerce' === $flow_type ) {
			$flow_data = self::update_default_data_for_ecommerce( $flow_data );
		}
		return $flow_data;
	}

	/**
	 * Function to encapsulate the private function post call made to update $flow_data
	 *
	 * @param array $params Param Data
	 *
	 * @return array
	 */
	public static function get_updated_flow_data( $params ) {
		$default_flow_data = self::get_default_flow_data();
		$flow_data         = self::read_flow_data_from_wp_option();
		return self::update_post_call_data_recursive( $flow_data, $default_flow_data, $params );
	}

	/**
	 * Function to update the Flow Data (Blueprint) in an array recursively in comparison to Flows::get_data() (Database)
	 *
	 * @param array $default_flow_data Blueprint Data
	 * @param array $flow_data WP Options Data
	 *
	 * @return array
	 */
	private static function update_flow_data_recursive( $default_flow_data, $flow_data ) {
		$flow_data_fixes = Flows::get_fixes();

		$updated_flow_data = array();
		foreach ( $default_flow_data as $key => $value ) {
			// Any Key renamed is updated in the database with NewKey and the value from the OldKey is retained or not based on retain_existing_value
			if ( count( $flow_data_fixes ) > 0 ) {
				foreach ( $flow_data_fixes as $index => $fix ) {
					if ( array_key_exists( $fix['old_key'], $flow_data ) && strcmp( $key, $fix['new_key'] ) === 0 ) {
						( $fix['retain_existing_value'] ) ?
							$updated_flow_data[ $fix['new_key'] ]   = $flow_data[ $fix['old_key'] ]
							: $updated_flow_data[ $fix['new_key'] ] = $default_flow_data[ $fix['new_key'] ];
						unset( $flow_data[ $fix['old_key'] ] );
						continue 2;
					}
				}
			}

			// To align the new data OR datatype of the respective values with the one set in the blueprint
			if ( ! array_key_exists( $key, $flow_data ) || ( gettype( $value ) !== gettype( $flow_data[ $key ] ) ) ) {
				$updated_flow_data[ $key ] = $value;
				continue;
			}

			// Accepts the value of non array OR empty array values from options
			if ( ! is_array( $value ) || ( is_array( $value ) && count( $value ) === 0 ) ) {
				$updated_flow_data[ $key ] = $flow_data[ $key ];
				continue;
			}

			// To handle Indexed Arrays gracefully
			if ( self::is_array_indexed( $value ) ) {
				// To check if an Indexed Array is further Nested or Not
				foreach ( $value as $index_key => $index_value ) {
					// For Indexed Arrays having Non Associative Array Values
					( ! is_array( $index_value ) && isset( $flow_data[ $key ] ) ) ?
						$updated_flow_data[ $key ]   = $flow_data[ $key ]
						: $updated_flow_data[ $key ] = $value;
				}
				continue;
			}

			// To handle Associative Arrays gracefully
			$updated_flow_data[ $key ] = self::update_flow_data_recursive( $value, $flow_data[ $key ] );
		}
		return $updated_flow_data;
	}

	/**
	 * Function to update the Database recursively based on Values opted or entered by the User
	 *
	 * @param array $flow_data WP Options Data
	 * @param array $default_flow_data Default Data
	 * @param array $params Params Data
	 *
	 * @return \WP_Error|array
	 */
	private static function update_post_call_data_recursive( &$flow_data, $default_flow_data, $params ) {
		$exception_list = Flows::get_exception_list();

		foreach ( $flow_data as $key => $value ) {
			if ( ! array_key_exists( $key, $params ) ) {
				$flow_data[ $key ] = $value;
				continue;
			}

			// Verifies the value of Exception List keys from the database and options
			if ( isset( $exception_list[ $key ] ) ) {
				$flow_data[ $key ] = $params[ $key ];
				continue;
			}

			// Error thrown if the datatype of the parameter does not match
			if ( gettype( $value ) !== gettype( $params[ $key ] ) ) {
				return new \WP_Error(
					'wrong_param_type_provided',
					'Wrong Parameter Type Provided : ' . $key . ' => ' . gettype( $params[ $key ] ) . '. Expected: ' . gettype( $value ),
					array( 'status' => 400 )
				);
			}

			// Accepts non-Array Values entered by the user
			if ( ! is_array( $value ) ) {
				$flow_data[ $key ] = $params[ $key ];
				continue;
			}

			// To handle Indexed Arrays gracefully
			if ( self::is_array_indexed( $params[ $key ] ) && ! self::is_array_indexed( $value ) && count( $params[ $key ] ) > 0 ) {
				// Verify if a value expected as an Associative Array is NOT an Indexed Array
				return new \WP_Error(
					'wrong_param_type_provided',
					'Wrong Parameter Type Provided : ' . $key . ' => Indexed Array. Expected: Associative Array',
					array( 'status' => 400 )
				);
			}

			// If the Database value is Empty/Indexed Array, to avoid Associative arrays to be overwritten (Eg: data)
			if ( self::is_array_indexed( $value ) || self::is_array_indexed( $default_flow_data[ $key ] ) ) {
				$flow_data[ $key ] = $params[ $key ];
				continue;
			}

			// To handle Associative Arrays gracefully
			$nested_flow_data = self::update_post_call_data_recursive( $value, $default_flow_data[ $key ], $params[ $key ] );
			if ( is_wp_error( $nested_flow_data ) ) {
				return $nested_flow_data;
			}
			$flow_data[ $key ] = $nested_flow_data;
		}
		return $flow_data;
	}

	/**
	 * Logic to check for an Indexed Array
	 *
	 * @param array $array To verify for an Indexed Array
	 *
	 * @return boolean
	 */
	private static function is_array_indexed( $array ) {
		return count( array_filter( array_keys( $array ), 'is_string' ) ) === 0;
	}

	/**
	 * Read onboarding flow options from database
	 *
	 * @return array|false
	 */
	public static function read_flow_data_from_wp_option() {
		return \get_option( Options::get_option_name( 'flow' ), false );
	}

	/**
	 * Check the current flow type and update default data if flowtype is ecommerce.
	 *
	 * @param array $data default flow data.
	 *
	 * @return array
	 */
	private static function update_default_data_for_ecommerce( $data ) {
		// update default data with ecommerce data
		$data['data']['topPriority']['priority1'] = 'selling';
		$data['data']['siteType']['referTo']      = 'business';
		return $data;
	}

	/**
	 * Function to search for key in array recursively with case sensitive exact match
	 *
	 * @param array  $params Param Data
	 * @param array  $flow_data Options Data
	 * @param string $header_key Array Level in Recursion
	 *
	 * @return \WP_error|boolean
	 */
	public static function find_mismatch_key( $params, $flow_data, $header_key = 'Base Level' ) {
		foreach ( $params as $key => $value ) {
			if ( is_array( $flow_data ) ) {
				// Error if the key added by the user is not present in the database
				if ( ! array_key_exists( $key, $flow_data ) ) {
					return new \WP_Error(
						'wrong_param_provided',
						'Wrong Parameter Provided',
						array(
							'status'                  => 400,
							'Mismatched Parameter(s)' => $header_key . ' => ' . $key,
						)
					);
				}

				// To check sub-Arrays: Indexed/Empty Arrays
				if ( ! is_array( $value ) || empty( $value ) || ( ! empty( $value ) && empty( $flow_data[ $key ] ) ) || self::is_array_indexed( $value ) ) {
					continue;
				}

				// For Associative Arrays
				$verify_key = self::find_mismatch_key( $value, $flow_data[ $key ], $key );
				if ( is_wp_error( $verify_key ) ) {
					return $verify_key;
				}
			}
		}
		return true;
	}
}
