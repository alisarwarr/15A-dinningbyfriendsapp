//implements the Gatsby API “onCreatePage”. This is called after every page is created
exports.onCreatePage = async({ actions: { createPage }, page }) => {
//************************************************************************************
    //only update the `/userprofile` page.
    if(page.path.match(/^\/userprofile/)) {
        page.matchPath = "/userprofile/*";
        createPage(page);
    }
//************************************************************************************


//************************************************************************************
    //only update the `/restaurantprofile` page.
    if(page.path.match(/^\/restaurantprofile/)) {
        page.matchPath = "/restaurantprofile/*";
        createPage(page);
    }
//************************************************************************************


//************************************************************************************
    //only update the `/welcome` page.
    if(page.path.match(/^\/welcome/)) {
        page.matchPath = "/welcome/*";
        createPage(page);
    }
//************************************************************************************


//************************************************************************************
    //only update the `/hisfriendslist` page.
    if(page.path.match(/^\/hisfriendslist/)) {
        page.matchPath = "/hisfriendslist/*";
        createPage(page);
    }
//************************************************************************************


//************************************************************************************
    //only update the `/hisrestaurantslist` page.
    if(page.path.match(/^\/hisrestaurantslist/)) {
        page.matchPath = "/hisrestaurantslist/*";
        createPage(page);
    }
//************************************************************************************


//************************************************************************************
    //only update the `/restaurantcustomerslist` page.
    if(page.path.match(/^\/restaurantcustomerslist/)) {
        page.matchPath = "/restaurantcustomerslist/*";
        createPage(page);
    }
//************************************************************************************
}