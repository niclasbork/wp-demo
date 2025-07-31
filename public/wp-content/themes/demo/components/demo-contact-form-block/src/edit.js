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
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

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
	const { heading, toEmail, successMessage, errorMessage } = attributes;

	const onChangeHeading = (newHeading) => {
		setAttributes({ heading: newHeading });
	};

	const onChangeToEmail = (newEmail) => {
		setAttributes({ toEmail: newEmail });
	};

	const onChangeSuccessMessage = (newMessage) => {
		setAttributes({ successMessage: newMessage });
	};

	const onChangeErrorMessage = (newMessage) => {
		setAttributes({ errorMessage: newMessage });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Form Settings', 'demo-contact-form-block')}>
					<TextControl
						label={__('Recipient Email', 'demo-contact-form-block')}
						value={toEmail}
						onChange={onChangeToEmail}
						type="email"
						help={__('The email address where form submissions will be sent.', 'demo-contact-form-block')}
					/>
					<TextareaControl
						label={__('Success Message', 'demo-contact-form-block')}
						value={successMessage}
						onChange={onChangeSuccessMessage}
						help={__('Message displayed after successful submission.', 'demo-contact-form-block')}
					/>
					<TextareaControl
						label={__('Error Message', 'demo-contact-form-block')}
						value={errorMessage}
						onChange={onChangeErrorMessage}
						help={__('Message displayed after a failed submission.', 'demo-contact-form-block')}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps({ className: 'demo-contact-form-block' }) }>
				<RichText
					tagName="h2"
					value={heading}
					onChange={onChangeHeading}
					placeholder={__('Contact Us', 'demo-contact-form-block')}
				/>
				<form className="demo-contact-form">
					<div className="form-group">
						<label htmlFor="contact-name">{__('Name:', 'demo-contact-form-block')}</label>
						<input type="text" id="contact-name" name="name" required disabled />
					</div>
					<div className="form-group">
						<label htmlFor="contact-email">{__('Email:', 'demo-contact-form-block')}</label>
						<input type="email" id="contact-email" name="email" required disabled />
					</div>
					<div className="form-group">
						<label htmlFor="contact-subject">{__('Subject:', 'demo-contact-form-block')}</label>
						<input type="text" id="contact-subject" name="subject" required disabled />
					</div>
					<div className="form-group">
						<label htmlFor="contact-message">{__('Message:', 'demo-contact-form-block')}</label>
						<textarea id="contact-message" name="message" rows="5" required disabled></textarea>
					</div>
					<button type="submit" disabled>{__('Send Message', 'demo-contact-form-block')}</button>
				</form>
			</div>
		</>
	);
}