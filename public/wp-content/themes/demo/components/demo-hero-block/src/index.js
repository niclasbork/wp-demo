/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from '../block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save: ({ attributes }) => {
		const { mediaUrl, mediaAlt, heading, description } = attributes;
		const blockProps = useBlockProps.save({ className: 'demo-hero-block' });
		return (
			<div { ...blockProps } style={{ backgroundImage: `url(${mediaUrl})` }}>
				<div className="demo-hero-block__overlay"></div>
				<div className="demo-hero-block__content">
					<h1 className="demo-hero-block__heading">{heading}</h1>
					<p className="demo-hero-block__description">{description}</p>
				</div>
			</div>
		);
	},
} );