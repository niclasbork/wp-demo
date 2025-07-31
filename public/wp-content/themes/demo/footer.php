</div><!-- #content -->

<footer class="site-footer">
	<div class="site-info">
		<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'demotheme' ) ); ?>">
			<?php
			/* translators: %s: WordPress. */
			printf( esc_html__( 'Proudly powered by %s', 'demotheme' ), 'WordPress' );
			?>
		</a>
		<span class="sep"> | </span>
		<?php
			/* translators: 1: Theme name, 2: Theme author. */
			printf( esc_html__( 'Theme: %1$s by %2$s.', 'demotheme' ), 'Demo Theme', '<a href="#">Gemini</a>' );
			?>
	</div>
</footer>

<?php wp_footer(); ?>

</body>
</html>