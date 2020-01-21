const google = window.google;

export default class MarkerManager {
  constructor(map, openReserveModal, landing) {
    this.map = map;
    this.openReserveModal = openReserveModal;
    this.landing = landing
    this.markers = {};
    this.openWindow = null;
    this.highlight = null;
    this.reservationButton = null;
    this.orangeIcon = "https://blueplate-development.s3.amazonaws.com/elements/red_marker.ico";
    this.blueIcon = "https://blueplate-development.s3.amazonaws.com/elements/blue_marker.ico";


    //Closing infoWindow when clicking anywhere on the map
    google.maps.event.addListener(this.map, "click", e => {
      if (this.openWindow) {
        this.openWindow.close();
        this.openWindow = null;
        this.reservationButton = null;
        this.reserveFunction = null;
      }
    });
  }


  createMarker(shop, menu = {}, animate = null) {
    let reserveFunction = () => { this.openReserveModal(menu, shop)};

    let contentString = this.landing ? 
      `
      <div class="info-window-landing">      
        <div class="info-shop-name">
          ${shop.name}
        </div >
        <div class="info-shop-address">
          ${shop.address}
        </div >
      </div >
      `
    :
      `
      <div class="info-window">
        <img class="info-win-img" src="${menu.imageUrl}"/>
      
        <div class="info-win-desc">
          <div class="info-win-menu">
            ${menu.name}
          </div >
          <div class="info-win-name">
            ${shop.name}
          </div >
        </div >
      </div >
      `;

    let infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    const position = new google.maps.LatLng(shop.latitude, shop.longitude);

    const marker = new google.maps.Marker({
      position,
      map: this.map,
      shopId: shop.id,
      icon: this.orangeIcon,
      animation: animate
    });

    marker.addListener("click", () => {
      //Closing infoWindow if there is one open already
      if (this.openWindow) {
        this.openWindow.close();
      }
      //Open the infoWindow
      this.openWindow = infoWindow;
      infoWindow.open(this.map, marker);
    });

    marker.addListener("mouseover", () => {
      marker.setIcon(this.blueIcon);
    });

    marker.addListener("mouseout", () => {
      marker.setIcon(this.orangeIcon);
    });

    this.markers[shop.id] = marker;
  }

  updateMarkers(shops, menus) {
    const shopsObj = {};

    shops.forEach(shop => {
      shopsObj[shop.id] = shop;
    });

    shops
      .filter(shop => !this.markers[shop.id])
      .forEach(newShop => {
        let menu = menus.filter(menu => menu.shop.id == newShop.id)
        return this.createMarker(newShop, menu[0])
      });

    Object.keys(this.markers)
      .filter(shopId => !shopsObj[shopId])
      .forEach(shopId => this.removeMarker(this.markers[shopId]));
  }

  removeMarker(marker) {
    this.markers[marker.shopId].setMap(null);
    delete this.markers[marker.shopId];
  }

  highlightMarker(shopId) {
    if (shopId !== this.highlight) {
      if (this.highlight && this.markers[this.highlight]) {
        this.markers[this.highlight].setIcon(this.orangeIcon);
      }
      if (shopId && this.markers[shopId]) {
        this.markers[shopId].setIcon(this.blueIcon);
      }

      this.highlight = shopId;
    }
  }
}
