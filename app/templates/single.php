<?php

/* Single Post File */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php 
			while ( have_posts() ) : the_post(); 
				get_template_part( 'template-parts/content', 'single' ); 
				the_post_navigation(); 

				// if ( comments_open() || get_comments_number() ) :
				// 	comments_template();
				// endif;
			endwhile; // End of the loop. 
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>