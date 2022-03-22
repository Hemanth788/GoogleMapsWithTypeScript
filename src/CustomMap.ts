import Company from "./Company";
import User from "./User";

interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  entityType(): string;
}

class CustomMap {
  private googleMap: google.maps.Map;

  constructor(id: string) {
    this.googleMap = new google.maps.Map(document.getElementById(id), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(entity: Mappable) {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: entity.location.lat,
        lng: entity.location.lng,
      },
    });
    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: `This is a ${entity.entityType()} and details are ${JSON.stringify(
          entity
        )}`,
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}

export default CustomMap;
