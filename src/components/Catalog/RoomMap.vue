<template>
	<div class="map-container">
		<div class="map"
			 ref="map"></div>
	</div>
</template>

<script>
  import infoWindowHelper from '../utils/room-map-infowindow'
  import markWithLabel from '../utils/marker-with-label'
  import {load} from '@zaichaopan/load-script'

  export default {
    props: {
      center: {
        // type: Object,
        // validator(value) {
        // return ['lat', 'lng'].every(
        //   key => ~Object.keys(value).indexOf(key)
        // )
        // }
      },
      rooms: {
        // type: Array,
        default() {
          return []
        }
      },
      hoveredRoom: {
        type: Object,
        default() {
          return {}
        }
      },
      markersArr: {}
    },
    data() {
      return {
        map: null,
        googleMaps: null,
        MarkerWithLabel: null,
        infoWindow: null,
        markers: [],
        zoom: 10,
        mapFullyLoaded: false
      }
    },
    watch: {
      rooms() {
        this.clearMarkers();
        this.addMarkers();
        this.createInfoWindow();
        this.updateMap();
      },
      center: {
        deep: true,
        handler: 'resetCenter'
      },
      hoveredRoom: {
        deep: true,
        handler: 'handleHoveredRoom'
      }
    },
    methods: {
      formatPrice(value) {
        let val = (value.split(',')[0] / 1).toFixed(2).replace('.', ',');

        return parseFloat(val.replace(/\B(?=(\d{3})+(?!\d))/g, "."));
      },
      updateMap() {
        var b = new google.maps.LatLngBounds();

        for (var i = 0; i < this.markersArr.length; i++) {
          b.extend(this.markersArr[i].position);
        }

        this.map.fitBounds(b);
      },
      initMap() {
        this.map = new this.googleMaps.Map(this.$refs.map, {
          zoom: this.zoom,
          zoomControl: true,
          zoomControlOptions: {position: window.google.maps.ControlPosition.LEFT_TOP},
          center: this.center
        })
        this.MarkerWithLabel = markWithLabel(this.googleMaps);
        this.infoWindow = new this.googleMaps.InfoWindow();

        this.clearMarkers();
        this.addMarkers();
        this.createInfoWindow();
        this.updateMap();
      },
      resetCenter() {
        this.mapFullyLoaded = false
        this.map.setCenter(new this.googleMaps.LatLng(this.center))
      },
      addEvenListeners() {
        this.map.addListener('bounds_changed', () => this.handleMapFullyLoaded())
      },
      handleMapChanged() {
        this.infoWindow.close();
        this.$emit('bounds:changed', {mapBounds: this.map.getBounds()})
      },
      handleMapFullyLoaded() {
        if (this.mapFullyLoaded) {
          return
        }
        this.mapFullyLoaded = true;
        this.handleMapChanged()
      },
      handleHoveredRoom() {
        this.markers.forEach(marker => {
          if (this.hoveredRoom === null) {
            return (~marker.labelClass.indexOf('hovered') && this.resetLabelClass(marker, 'map-price-container'))
          }
          if (marker.room.id === this.hoveredRoom.id) {
            return this.resetLabelClass(marker, 'map-price-container-hovered')
          }
          ~marker.labelClass.indexOf('hovered') && this.resetLabelClass(marker, 'map-price-container')
        })
      },
      clearMarkers() {
        this.markers.forEach(marker => {
          marker.setMap(null)
        })
      },
      addMarkers() {
        this.markers = Object.values(this.rooms).map((room) => {
          let {x, y} = room;

          let lat = Number(x);
          let lng = Number(y);

          const marker = new this.MarkerWithLabel(this.getMarkerLabelOptions({
            lat,
            lng
          }, room, this.map));
          marker.room = room;
          return marker
        })
      },
      resetLabelClass(marker, lableClass) {
        marker.labelClass = lableClass
        marker.label.setStyles()
      },
      getMarkerLabelOptions(
        position,
        room,
        map,
        lableContentClass = 'map-price-marker'
      ) {
        return {
          map,
          position,
          icon: ' ',
          draggable: false,
          raiseOnDrag: true,
          labelContent: `<div class="${lableContentClass}"><span>${
            this.formatPrice(room.price) + ' млн'
            }</span></div>`,
          labelClass: 'map-price-container'
        }
      },
      removeInfoWindowWhiteSpace() {
        infoWindowHelper.removeWhiteSpace()
      },
      handleInfoWindowDomReady(infoWindow) {
        this.googleMaps.event.addListener(infoWindow, 'domready', () => {
          infoWindowHelper.removeWhiteSpace()
          infoWindowHelper.initSlides(
            'siema-container',
            'prev',
            'next',
            'siema',
            'indicators'
          )
        })
      },
      resetInfoWindow() {
        this.infoWindow = this.infoWindow && new this.googleMaps.InfoWindow()
        return this.infoWindow
      },
      createInfoWindow() {
        const vm = this
        const infoWindow = this.resetInfoWindow()
        this.map.addListener('click', event => infoWindow.close())
        this.handleInfoWindowDomReady(this.infoWindow)
        this.markers.forEach(marker =>
          marker.addListener('click', function () {
            infoWindow.setContent(infoWindowHelper.getContentHtml(this))
            infoWindow.open(vm.map, this)
          })
        )
      }
    },
    async mounted() {
      try {
        let google = await load({
          src: 'https://maps.googleapis.com/maps/api/js',
          callbackName: 'callback',
          resolve: 'google',
          params: {
            key: 'AIzaSyAx7epVPgE5H-G4DiGr-tQa89qltkNxHxs',
            libraries: 'places'
          }
        })

        this.googleMaps = google.maps
        this.initMap()
        this.addEvenListeners()
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="scss">

</style>
