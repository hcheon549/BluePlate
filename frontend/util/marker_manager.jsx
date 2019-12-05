const google = window.google;

export default class MarkerManager {
  constructor(map, modal) {
    this.map = map;
    this.modal = modal;
    this.markers = {};
    this.openWindow = null;
    this.highlight = null;
    this.resButton = null;
    this.reserveFunction = null;
    this.orangeIcon = "https://blueplate-development.s3.amazonaws.com/elements/red_marker.ico";
    this.blueIcon = "https://blueplate-development.s3.amazonaws.com/elements/blue_marker.ico";

    google.maps.event.addListener(this.map, "click", e => {
      if (this.openWindow) {
        this.resButton.removeEventListener("click", this.reserveFunction);
        this.openWindow.close();

        this.openWindow = null;
        this.resButton = null;
        this.reserveFunction = null;
      }
    });
  }

  updateMarkers(shops, menus) {
    const shopsObj = {};

    shops.forEach(shop => {
      shopsObj[shop.id] = shop;
    });

    shops
      .filter(shop => !this.markers[shop.id])
      .forEach(newShop => this.createMarker(newShop, menus[newShop.id]));

    Object.keys(this.markers)
      .filter(shopId => !shopsObj[shopId])
      .forEach(shopId => this.removeMarker(this.markers[shopId]));
  }

  createMarker(shop, menu = {}, animate = null) {
    let contentString = `<div class="info-window">

        <img class="info-win-img" src="${menu.imageUrl}"/>
      
        <div class="info-win-desc">
          <div class="info-win-name">
            ${menu.name}
          </div >
          <div class="info-win-name">
            ${shop.name}
          </div >
          <div id="map-reserve" class="info-win-name info-win-reserve">
            RESERVE
          </div >
        </div >
      </div >`;

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
      if (this.openWindow) {
        this.resButton.removeEventListener("click", this.reserveFunction);
        this.openWindow.close();
      }
      this.openWindow = infoWindow;
      infoWindow.open(this.map, marker);

      this.resButton = document.getElementById("map-reserve");

      this.reserveFunction = () => {
        this.modal(menu, shop);
      };

      this.resButton.addEventListener("click", this.reserveFunction);
    });

    marker.addListener("mouseover", () => {
      marker.setIcon(this.blueIcon);
    });

    marker.addListener("mouseout", () => {
      marker.setIcon(this.orangeIcon);
    });

    this.markers[shop.id] = marker;
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
