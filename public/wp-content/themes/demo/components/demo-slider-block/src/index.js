/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps } from '@wordpress/block-editor'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss'

/**
 * Internal dependencies
 */
import Edit from './edit'
import metadata from '../block.json'

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save: ({ attributes }) => {
		const {
			slides,
			loop,
			slidesPerView,
			spaceBetween,
			pagination,
			paginationType,
			navigation,
			autoplay,
			autoplayDelay,
			autoplayDisableOnInteraction,
		} = attributes
		const blockProps = useBlockProps.save()

		return (
			<div {...blockProps}>
				{slides.length > 0 ? (
					<div
						className='swiper swiper-container mySwiper'
						data-loop={loop}
						data-slides-per-view={slidesPerView}
						data-space-between={spaceBetween}
						data-pagination={pagination}
						data-pagination-type={paginationType}
						data-navigation={navigation}
						data-autoplay={autoplay}
						data-autoplay-delay={autoplayDelay}
						data-autoplay-disable-on-interaction={
							autoplayDisableOnInteraction
						}
					>
						<div className='swiper-wrapper'>
							{slides.map((slide, index) => (
								<div className='swiper-slide' key={index}>
									<div
										className='demo-slider-block__slide'
										style={{
											backgroundImage: `url(${slide.mediaUrl})`,
										}}
									>
										<div className='demo-slider-block__overlay'></div>
										<div className='demo-slider-block__content'>
											{slide.heading && (
												<h2 className='demo-slider-block__heading'>
													{slide.heading}
												</h2>
											)}
											{slide.description && (
												<p className='demo-slider-block__description'>
													{slide.description}
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
						{pagination && (
							<div className='swiper-pagination'></div>
						)}
						{navigation && (
							<div className='swiper-button-prev'></div>
						)}
						{navigation && (
							<div className='swiper-button-next'></div>
						)}
					</div>
				) : (
					<p>{__('No slides to display.', 'demo-slider-block')}</p>
				)}
			</div>
		)
	},
})
