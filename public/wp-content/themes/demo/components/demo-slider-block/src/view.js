import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
	const sliders = document.querySelectorAll(
		'.wp-block-demo-theme-demo-slider-block .mySwiper'
	);
	sliders.forEach((slider) => {
		const loop = slider.dataset.loop === 'true';
		const slidesPerView = parseInt(slider.dataset.slidesPerView, 10) || 1;
		const spaceBetween = parseInt(slider.dataset.spaceBetween, 10) || 0;
		const pagination = slider.dataset.pagination === 'true';
		const paginationType = slider.dataset.paginationType || 'bullets';
		const navigation = slider.dataset.navigation === 'true';
		const autoplay = slider.dataset.autoplay === 'true';
		const autoplayDelay = parseInt(slider.dataset.autoplayDelay, 10) || 2500;
		const autoplayDisableOnInteraction =
			slider.dataset.autoplayDisableOnInteraction === 'true';

		const swiperConfig = {
			modules: [Navigation, Pagination, Autoplay],
			loop,
			slidesPerView,
			spaceBetween,
		};

		if (pagination) {
			swiperConfig.pagination = {
				el: slider.querySelector('.swiper-pagination'),
				clickable: true,
				type: paginationType,
			};
		}

		if (navigation) {
			swiperConfig.navigation = {
				nextEl: slider.querySelector('.swiper-button-next'),
				prevEl: slider.querySelector('.swiper-button-prev'),
			};
		}

		if (autoplay) {
			swiperConfig.autoplay = {
				delay: autoplayDelay,
				disableOnInteraction: autoplayDisableOnInteraction,
			};
		}

		new Swiper(slider, swiperConfig);
	});
});