/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, Dashicon, PanelBody, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { slides, loop, slidesPerView, spaceBetween, pagination, paginationType, navigation, autoplay, autoplayDelay, autoplayDisableOnInteraction } = attributes;

	const addSlide = () => {
		setAttributes({
			slides: [
				...slides,
				{
					mediaId: 0,
					mediaUrl: '',
					mediaAlt: '',
					heading: '',
					description: '',
				},
			],
		});
	};

	const removeSlide = (indexToRemove) => {
		setAttributes({
			slides: slides.filter((slide, index) => index !== indexToRemove),
		});
	};

	const onSelectMedia = (media, indexToUpdate) => {
		const newSlides = [...slides];
		newSlides[indexToUpdate] = {
			...newSlides[indexToUpdate],
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt,
		};
		setAttributes({ slides: newSlides });
	};

	const onChangeHeading = (newHeading, indexToUpdate) => {
		const newSlides = [...slides];
		newSlides[indexToUpdate] = {
			...newSlides[indexToUpdate],
			heading: newHeading,
		};
		setAttributes({ slides: newSlides });
	};

	const onChangeDescription = (newDescription, indexToUpdate) => {
		const newSlides = [...slides];
		newSlides[indexToUpdate] = {
			...newSlides[indexToUpdate],
			description: newDescription,
		};
		setAttributes({ slides: newSlides });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Slider Settings', 'demo-slider-block')}>
					<ToggleControl
						label={__('Loop', 'demo-slider-block')}
						checked={loop}
						onChange={(value) => setAttributes({ loop: value })}
					/>
					<RangeControl
						label={__('Slides per View', 'demo-slider-block')}
						value={slidesPerView}
						onChange={(value) => setAttributes({ slidesPerView: value })}
						min={1}
						max={5}
					/>
					<RangeControl
						label={__('Space Between Slides (px)', 'demo-slider-block')}
						value={spaceBetween}
						onChange={(value) => setAttributes({ spaceBetween: value })}
						min={0}
						max={100}
					/>
					<ToggleControl
						label={__('Show Pagination', 'demo-slider-block')}
						checked={pagination}
						onChange={(value) => setAttributes({ pagination: value })}
					/>
					{pagination && (
						<SelectControl
							label={__('Pagination Type', 'demo-slider-block')}
							value={paginationType}
							onChange={(value) => setAttributes({ paginationType: value })}
							options={[
								{ label: __('Bullets', 'demo-slider-block'), value: 'bullets' },
								{ label: __('Fraction', 'demo-slider-block'), value: 'fraction' },
								{ label: __('Progressbar', 'demo-slider-block'), value: 'progressbar' },
							]}
						/>
					)}
					<ToggleControl
						label={__('Show Navigation', 'demo-slider-block')}
						checked={navigation}
						onChange={(value) => setAttributes({ navigation: value })}
					/>
					<ToggleControl
						label={__('Autoplay', 'demo-slider-block')}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>
					{autoplay && (
						<RangeControl
							label={__('Autoplay Delay (ms)', 'demo-slider-block')}
							value={autoplayDelay}
							onChange={(value) => setAttributes({ autoplayDelay: value })}
							min={1000}
							max={10000}
							step={100}
						/>
					)}
					{autoplay && (
						<ToggleControl
							label={__('Disable Autoplay on Interaction', 'demo-slider-block')}
							checked={autoplayDisableOnInteraction}
							onChange={(value) => setAttributes({ autoplayDisableOnInteraction: value })}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps({ className: 'demo-slider-block' }) }>
				{slides.length === 0 && (
					<p>{__('No slides added yet. Add a slide to get started.', 'demo-slider-block')}</p>
				)}
				{slides.map((slide, index) => (
					<div key={index} className="demo-slider-block__slide-editor">
						<Button
							className="demo-slider-block__remove-slide"
							onClick={() => removeSlide(index)}
							isDestructive
						>
							<Dashicon icon="trash" />
						</Button>
						<div className="demo-slider-block__media-upload">
							{slide.mediaUrl ? (
								<img src={slide.mediaUrl} alt={slide.mediaAlt} />
							) : (
								<p>{__('No image selected for this slide', 'demo-slider-block')}</p>
							)}
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => onSelectMedia(media, index)}
									value={slide.mediaId}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} isPrimary>
											{slide.mediaUrl ? __('Replace Image', 'demo-slider-block') : __('Select Image', 'demo-slider-block')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						</div>
						<RichText
							tagName="h2"
							value={slide.heading}
							onChange={(newHeading) => onChangeHeading(newHeading, index)}
							placeholder={__('Enter slide heading...', 'demo-slider-block')}
						/>
						<RichText
							tagName="p"
							value={slide.description}
							onChange={(newDescription) => onChangeDescription(newDescription, index)}
							placeholder={__('Enter slide description...', 'demo-slider-block')}
						/>
					</div>
				))}
				<Button onClick={addSlide} isSecondary>
					{__('Add New Slide', 'demo-slider-block')}
				</Button>
			</div>
		</>
	);
}
