import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import "./Map.scss";

const Map = ({center, children, zoom, zoomControl, blur, dragging, scrollWheelZoom, doubleClickZoom}) => {
  
  return (
    <MapContainer center={center} zoomControl={false} zoom={zoom} doubleClickZoom={doubleClickZoom} scrollWheelZoom={scrollWheelZoom} attributionControl={false} dragging={!dragging} className={blur ? "map-blur" : ""}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zoomControl && <ZoomControl/>}
        {children && children}
      </MapContainer>
  )
}

export default Map