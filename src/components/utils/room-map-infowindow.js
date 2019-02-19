import {initSlides} from './siema-slide'

const createSlideHtml = marker => {
  return marker.room.images
    .map(image => {
      return `
        <a href="#">
          <img src="${image}" alt="${marker.room.name}"/>
        </a>
       `
    })
    .join('')
}

const infoWindow = {
  getContentHtml(marker) {
    let room = marker.room;

    return `
      
      <a href="/object/a1" class="card card_place card_xs">
      <div class="card__photo" style="background-image: url('/images/data/${room.photo}');"></div> 
      <div class="card__body">
      <div class="card__title">
				${room.title}
			</div> 
			<div class="card__location">
			<svg version="1.1" viewBox="0 0 14 19" class="svg-icon svg-fill" style="width: 14px; height: 18px;"><desc>Created using Figma</desc><use xlink:href="#svgicon-point-card-a" transform="translate(0 .2)" fill="#4D4D4D"></use><defs><path pid="0" id="svgicon-point-card-a" fill-rule="evenodd" d="M0 7.26C0 3.27 3.15 0 7 0s7 3.27 7 7.26c0 1.47-.35 2.94-1.138 4.38-.554 1.14-1.341 2.28-2.333 3.36-1.662 1.83-3.325 2.91-3.383 2.94l-.007.003c-.056.029-.112.057-.168.057-.058 0-.117-.03-.175-.06-.059-.03-1.72-1.11-3.383-2.94-.992-1.08-1.78-2.22-2.334-3.36C.35 10.17 0 8.7 0 7.26zm7 2.505a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></defs></svg> 
			<span>
					г. Ялта ул. Выдуманная, 5
				</span>
				</div> 
			<div class="card__info infoPlace">
			<div class="card__info__item infoPlace__item">
			<div class="card__info__icon infoPlace__icon"><svg version="1.1" viewBox="0 0 27 25" class="svg-icon svg-fill" style="width: 24px; height: 24px;"><desc>Created using Figma</desc><use xlink:href="#svgicon-area-a" transform="translate(0 .2)" fill="#4D4D4D"></use><defs><path pid="0" id="svgicon-area-a" d="M.764 0A.839.839 0 0 0 .22.28.865.865 0 0 0 0 .859v22.284c0 .227.089.445.247.606.158.16.373.251.597.251h21.089c.224 0 .438-.09.596-.251a.864.864 0 0 0 .247-.606v-9.04l3.941-3.602A.861.861 0 0 0 27 9.905a.876.876 0 0 0-.216-.623.851.851 0 0 0-.586-.286.837.837 0 0 0-.613.219l-4.218 3.857a.856.856 0 0 0-.277.643v2.571h-3.796a.834.834 0 0 0-.664.28.862.862 0 0 0-.14.942.857.857 0 0 0 .478.442.831.831 0 0 0 .326.05h3.796v4.286h-9.28v-3.857a.868.868 0 0 0-.246-.62.843.843 0 0 0-.61-.25.831.831 0 0 0-.592.26.859.859 0 0 0-.238.61v3.857H1.687v-8.143h9.28c.223 0 .438-.09.596-.25a.864.864 0 0 0 .247-.607v-2.611l3.941-3.603a.871.871 0 0 0-.058-1.357.835.835 0 0 0-.482-.156.836.836 0 0 0-.594.227L10.4 9.643a.858.858 0 0 0-.277.643v2.143H1.687V1.715h8.436v3.857a.869.869 0 0 0 .243.614.843.843 0 0 0 .6.255.832.832 0 0 0 .601-.255.859.859 0 0 0 .243-.614V1.715h9.28V6.43a.87.87 0 0 0 .242.614.843.843 0 0 0 .6.256.833.833 0 0 0 .602-.256.859.859 0 0 0 .242-.614V.86a.864.864 0 0 0-.247-.607.837.837 0 0 0-.596-.251H.843a.83.83 0 0 0-.079 0z"></path></defs></svg></div> 
			<div class="card__info__value infoPlace__value">
						89,45
						<span> кв. м.</span></div></div> <div class="card__info__item infoPlace__item"><div class="card__info__icon infoPlace__icon"><svg version="1.1" viewBox="0 0 26 26" class="svg-icon svg-fill" style="width: 24px; height: 24px;"><desc>Created using Figma</desc><g transform="translate(1 1.2)" _fill="#4D4D4D"><use xlink:href="#svgicon-price-a"></use><use xlink:href="#svgicon-price-b"></use></g><defs><path pid="0" id="svgicon-price-a" d="M12 0C5.379 0 0 5.379 0 12s5.379 12 12 12 12-5.379 12-12S18.621 0 12 0zm0 1.043c6.057 0 10.956 4.9 10.956 10.957S18.057 22.956 12 22.956C5.943 22.956 1.043 18.057 1.043 12c0-6.057 4.9-10.957 10.957-10.957zM6.728 5.217c-.273.026-.425.248-.424.522.006.423.249.547.522.522h1.565v6.26H6.826a.535.535 0 0 0-.522.522c0 .276.246.526.522.522h1.565v2.087H6.826a.522.522 0 1 0 0 1.044h1.565v2.608a.535.535 0 0 0 .522.522.536.536 0 0 0 .522-.522v-2.608h4.695a.522.522 0 1 0 0-1.044H9.435v-2.087h4.174c2.227 0 4.174-1.855 4.174-4.174 0-2.318-1.947-4.174-4.174-4.174h-6.88zm2.707 1.044h4.174c1.642 0 3.13 1.402 3.13 3.13s-1.488 3.13-3.13 3.13H9.435v-6.26z"></path><path pid="1" id="svgicon-price-b" d="M6.728 5.217v-.25h-.011l-.012.001.023.25zm-.424.522l-.25.002v.001l.25-.003zm.522.522v-.25h-.012l-.011.001.023.249zm1.565 0h.25v-.25h-.25v.25zm0 6.26v.25h.25v-.25h-.25zm-1.565 0l-.005.25h.005v-.25zm0 1.044v-.25h-.003l.003.25zm1.565 0h.25v-.25h-.25v.25zm0 2.087v.25h.25v-.25h-.25zm0 1.044h.25v-.25h-.25v.25zm0 2.608l.25.005v-.005h-.25zm1.044 0h-.25v.004l.25-.004zm0-2.608v-.25h-.25v.25h.25zm0-1.044h-.25v.25h.25v-.25zm0-2.087v-.25h-.25v.25h.25zm0-7.304v-.25h-.25v.25h.25zm0 6.26h-.25v.25h.25v-.25zM12-.25C5.24-.25-.25 5.24-.25 12h.5C.25 5.517 5.517.25 12 .25v-.5zM-.25 12c0 6.76 5.49 12.25 12.25 12.25v-.5C5.517 23.75.25 18.483.25 12h-.5zM12 24.25c6.76 0 12.25-5.49 12.25-12.25h-.5c0 6.483-5.267 11.75-11.75 11.75v.5zM24.25 12C24.25 5.24 18.76-.25 12-.25v.5C18.483.25 23.75 5.517 23.75 12h.5zM12 1.293c5.92 0 10.706 4.788 10.706 10.707h.5A11.199 11.199 0 0 0 12 .793v.5zM22.706 12c0 5.92-4.787 10.706-10.706 10.706v.5A11.199 11.199 0 0 0 23.206 12h-.5zM12 22.706A10.699 10.699 0 0 1 1.293 12h-.5A11.199 11.199 0 0 0 12 23.206v-.5zM1.293 12C1.293 6.08 6.081 1.293 12 1.293v-.5A11.199 11.199 0 0 0 .793 12h.5zm5.412-7.032a.688.688 0 0 0-.49.264.817.817 0 0 0-.16.509l.5-.003a.32.32 0 0 1 .056-.2.189.189 0 0 1 .14-.072l-.046-.498zm-.65.774c.003.258.08.475.248.617.165.139.37.167.546.15l-.046-.497c-.097.009-.15-.012-.177-.035-.023-.02-.07-.076-.072-.241l-.5.006zm.771.769h1.565v-.5H6.826v.5zm1.315-.25v6.26h.5v-6.26h-.5zm.25 6.01H6.826v.5h1.565v-.5zm-1.56 0c-.422-.007-.777.363-.777.772h.5c0-.141.138-.274.267-.271l.01-.5zm-.777.772c0 .411.356.778.776.772l-.007-.5c-.132.002-.269-.13-.269-.271h-.5zm.772.772h1.565v-.5H6.826v.5zm1.315-.25v2.087h.5v-2.087h-.5zm.25 1.837H6.826v.5h1.565v-.5zm-1.565 0a.772.772 0 0 0-.772.772h.5c0-.15.122-.272.272-.272v-.5zm-.772.772c0 .426.346.772.772.772v-.5a.272.272 0 0 1-.272-.272h-.5zm.772.772h1.565v-.5H6.826v.5zm1.315-.25v2.608h.5v-2.608h-.5zm0 2.604c-.008.421.363.776.772.776v-.5c-.142 0-.274-.137-.272-.267l-.5-.01zm.772.776c.41 0 .778-.356.772-.775l-.5.007c.002.131-.131.268-.272.268v.5zm.772-.772v-2.608h-.5v2.608h.5zm-.25-2.358h4.695v-.5H9.435v.5zm4.695 0a.772.772 0 0 0 .772-.772h-.5c0 .15-.121.272-.272.272v.5zm.772-.772a.772.772 0 0 0-.772-.772v.5c.15 0 .272.122.272.272h.5zm-.772-.772H9.435v.5h4.695v-.5zm-4.445.25v-2.087h-.5v2.087h.5zm-.25-1.837h4.174v-.5H9.435v.5zm4.174 0c2.362 0 4.424-1.964 4.424-4.424h-.5c0 2.177-1.831 3.924-3.924 3.924v.5zm4.424-4.424c0-2.46-2.062-4.424-4.424-4.424v.5c2.093 0 3.924 1.747 3.924 3.924h.5zm-4.424-4.424h-6.88v.5h6.88v-.5zM9.435 6.511h4.174v-.5H9.435v.5zm4.174 0c1.508 0 2.88 1.295 2.88 2.88h.5c0-1.87-1.605-3.38-3.38-3.38v.5zm2.88 2.88c0 1.586-1.372 2.88-2.88 2.88v.5c1.775 0 3.38-1.51 3.38-3.38h-.5zm-2.88 2.88H9.435v.5h4.174v-.5zm-3.924.25v-6.26h-.5v6.26h.5z"></path></defs></svg></div> <div class="card__info__value infoPlace__value item-price">
						9.179.673,00
					</div></div></div> <div class="card__bottom"><span class="btn btn-link">
            Подробнее
            
           </span></div></div></a>
      
      `
  },
  removeWhiteSpace() {
    let iwOuters = document.querySelectorAll('.gm-style-iw')
    for (const iwOuter of iwOuters) {
      let iwBackground = iwOuter.previousElementSibling
      for (const child of iwBackground.children) {
        child.style.display = 'none'
      }
    }
  },

  initSlides(
    containerClass,
    preActionClass,
    nextActionClass,
    siemaClass,
    indicatorsClass
  ) {
    initSlides(
      containerClass,
      preActionClass,
      nextActionClass,
      siemaClass,
      indicatorsClass
    )
  }
}

export default infoWindow
