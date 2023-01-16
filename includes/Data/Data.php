<?php
namespace NewfoldLabs\WP\Module\Onboarding\Data;

use NewfoldLabs\WP\Module\Onboarding\Permissions;
use NewfoldLabs\WP\Module\CustomerBluehost\CustomerBluehost;

/**
 * CRUD methods for Onboarding config for use in API, CLI and runtime.
 */
final class Data {
	/**
	 * Runtime data for Onboarding application
	 */
	public static function runtime() {
		return array(
			'buildUrl'          => \NFD_ONBOARDING_BUILD_URL,
			'siteUrl'           => \get_site_url(),
			'restUrl'           => \get_home_url() . '/index.php?rest_route=',
			'adminUrl'          => \admin_url(),
			'currentBrand'      => self::current_brand(),
			'currentPlan'       => self::current_plan(),
			'currentFlow'       => self::current_flow(),
			'pluginInstallHash' => Permissions::rest_get_plugin_install_hash(),
			'previewSettings'   => array(
				'settings'        => Preview::get_settings(),
				'stepPreviewData' => Themes::step_preview_data(),
			),
		);
	}

	/**
	 * Establish brand to apply to Onboarding experience.
	 *
	 * [TODO]: Pull brand from container.
	 *
	 * @return array
	 */
	public static function current_brand() {

		$brand = \get_option( Options::get_option_name( 'brand', false ), 'newfold' );
		// This case arises when the option mm_brand exists but has an empty string as it's value.
		if ( empty( $brand ) ) {
			$brand = 'newfold';
		}
		$brand = \apply_filters( 'nfd_module_onboarding_brand', sanitize_title_with_dashes( str_replace( '_', '-', $brand ) ) );

		$brands = Brands::get_brands();

		return array_key_exists( $brand, $brands ) ? $brands[ $brand ] : array( 'brand' => $brand );
	}


	/**
	 * Get the current hosting plan information.
	 *
	 * @return array
	 */
	public static function current_plan() {
		$customer_data = self::customer_data();

		$current_flow = Flows::get_flow_from_customer_data( $customer_data );
		if ( $current_flow !== false ) {
			 return array(
				 'flow'    => $current_flow,
				 'subtype' => $customer_data['plan_subtype'],
				 'type'    => $customer_data['plan_type'],
			 );
		}

		$current_flow = Flows::get_flow_from_params();
		return array(
			'flow'    => ( $current_flow !== false ) ? $current_flow : Flows::get_default_flow(),
			'subtype' => null,
			'type'    => null,
		);
	}

	/**
	 * Get the current onboarding flow.
	 *
	 * @return string
	 */
	public static function current_flow() {

		$current_flow = Flows::get_flow_from_params();
		if ( $current_flow !== false ) {
			return $current_flow;
		}

		$customer_data = self::customer_data();
		$current_flow  = Flows::get_flow_from_customer_data( $customer_data );
		if ( $current_flow !== false ) {
			return $current_flow;
		}

		return Flows::get_default_flow();
	}

	/**
	 * Get the current customer data using the Bluehost customer data module.
	 *
	 * @return array
	 */
	public static function customer_data() {
		if ( class_exists( 'NewfoldLabs\WP\Module\CustomerBluehost\CustomerBluehost' ) ) {
			 return CustomerBluehost::collect();
		}
		 return array();
	}

} // END \NewfoldLabs\WP\Module\Onboarding\Data()
