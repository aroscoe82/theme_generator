<?php

/* Archive File */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php 
			if ( have_posts() ) : ?>

				<header class="page-header">
					<?php
						the_archive_title( '<h1 class="page-title">', '</h1>' );
						the_archive_description( '<div class="taxonomy-description">', '</div>' );
					?>
				</header><!-- .page-header -->

			<?php 
				/* Start the Loop */
				while ( have_posts() ) : the_post(); 
					get_template_part( 'template-parts/content', get_post_format() );
				endwhile;

				the_posts_navigation();

			else : 
				
				get_template_part( 'template-parts/content', 'none' ); 

			endif; 
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>