/** Skeleton Structure for the SideBar */
const SidebarSkeleton = () => {
    
    return (
        <div className = 'sidebar-skeleton'>
            <div className='sidebar-skeleton-header'>
                <div className='sidebar-skeleton-header-top'>
                    <div className='sidebar-skeleton-header-top-profile' />
                    <div className='sidebar-skeleton-header-top-header' />
                </div>
                <div className='sidebar-skeleton-header-below'>
                    <div className='sidebar-skeleton-header-below-subheading-1' />
                    <div className='sidebar-skeleton-header-below-subheading-2' />
                </div>
            </div>
            <div className='sidebar-skeleton-body'>
                <div className='sidebar-skeleton-body-image'/>
            </div>
            <div className='sidebar-skeleton-footer'>
                <div className='sidebar-skeleton-footer-line-1' />
                <div className='sidebar-skeleton-footer-line-2' />
                <div className='sidebar-skeleton-footer-line-3' />
                <div className='sidebar-skeleton-footer-line-4' />
                <div className='sidebar-skeleton-footer-line-5' />

                <div className='sidebar-skeleton-footer-buttons'>
                    <div className='sidebar-skeleton-footer-buttons-button-1' />
                    <div className='sidebar-skeleton-footer-buttons-button-2' />
                </div>
            </div>
        </div>
    );
};

export default SidebarSkeleton;
