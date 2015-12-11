<?php

/* Main File */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php 
			if ( have_posts() ) : ?>

				<?php if ( is_home() && ! is_front_page() ) : ?>
					<header>
						<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
					</header>
				<?php 
			endif; ?>

			<?php 
				while ( have_posts() ) : the_post(); 
					/* Start Loop */ 
					get_template_part( 'template-parts/content', get_post_format() );
				endwhile; 

				the_posts_navigation();
			else : 

				get_template_part( 'template-parts/content', 'none' );

			endif; ?>

			<?php 
				if (get_theme_mod( 'facebook_url' )):
					$facebook_url = get_theme_mod( 'facebook_url' );
					echo '<p><a href="' . $facebook_url . '" target="_blank">' . $facebook_url . '</a></p>';
				endif;
				if (get_theme_mod( 'twitter_url' )):
					$twitter_url = get_theme_mod( 'twitter_url' );
					echo '<p><a href="' . $twitter_url . '" target="_blank">' . $twitter_url . '</a></p>';
				endif;
				if (get_theme_mod( 'instagram_url' )):
					$instagram_url = get_theme_mod( 'instagram_url' );
					echo '<p><a href="' . $instagram_url . '" target="_blank">' . $instagram_url . '</a></p>';
				endif;
				if (get_theme_mod( 'linkedin_url' )):
					$linkedin_url = get_theme_mod( 'linkedin_url' );
					echo '<p><a href="' . $linkedin_url . '" target="_blank">' . $linkedin_url . '</a></p>';
				endif;

			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>