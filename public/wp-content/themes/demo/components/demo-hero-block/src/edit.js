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
import { useBlockProps, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { mediaId, mediaUrl, mediaAlt, heading, description } = attributes;

	const onSelectMedia = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt,
		});
	};

	const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: '',
			mediaAlt: '',
		});
	};

	const onChangeHeading = (newHeading) => {
		setAttributes({ heading: newHeading });
	};

	const onChangeDescription = (newDescription) => {
		setAttributes({ description: newDescription });
	};

	return (
		<div { ...useBlockProps({ className: 'demo-hero-block' }) }>
			<div className="demo-hero-block__media-upload">
				{mediaUrl ? (
					<img src={mediaUrl} alt={mediaAlt} />
				) : (
					<p>{__('No image selected', 'demo-hero-block')}</p>
				)}
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectMedia}
						value={mediaId}
						allowedTypes={['image']}
						render={({ open }) => (
							<Button onClick={open} isPrimary>
								{mediaUrl ? __('Replace Image', 'demo-hero-block') : __('Select Image', 'demo-hero-block')}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				{mediaUrl && (
					<Button onClick={removeMedia} isDestructive>
						{__('Remove Image', 'demo-hero-block')}
					</Button>
				)}
			</div>
			<div className="demo-hero-block__content">
				<RichText
					tagName="h1"
					value={heading}
					onChange={onChangeHeading}
					placeholder={__('Enter heading...', 'demo-hero-block')}
				/>
				<RichText
					tagName="p"
					value={description}
					onChange={onChangeDescription}
					placeholder={__('Enter description...', 'demo-hero-block')}
				/>
			</div>
		</div>
	);
}