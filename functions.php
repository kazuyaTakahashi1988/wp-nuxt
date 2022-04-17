<?php
/**
 * WPサイトのfunction.phpに以下の記述を追加
 * またプラグイン「ACF to REST API」をインストール、有効かしてください。
 */



add_action( 'rest_api_init', 'rest_api_filter_add_filters' );

 /**
  * Add the necessary filter to each post type
  **/
function rest_api_filter_add_filters() {
	foreach ( get_post_types( array( 'show_in_rest' => true ), 'objects' ) as $post_type ) {
		add_filter( 'rest_' . $post_type->name . '_query', 'rest_api_filter_add_filter_param', 10, 2 );
	}
}

/**
 * Add the filter parameter
 *
 * @param  array           $args    The query arguments.
 * @param  WP_REST_Request $request Full details about the request.
 * @return array $args.
 **/
function rest_api_filter_add_filter_param( $args, $request ) {
	// Bail out if no filter parameter is set.
	if ( empty( $request['filter'] ) || ! is_array( $request['filter'] ) ) {
		return $args;
	}

	$filter = $request['filter'];

	if ( isset( $filter['posts_per_page'] ) && ( (int) $filter['posts_per_page'] >= 1 && (int) $filter['posts_per_page'] <= 100 ) ) {
		$args['posts_per_page'] = $filter['posts_per_page'];
	}

	global $wp;
	$vars = apply_filters( 'rest_query_vars', $wp->public_query_vars );

	// Allow valid meta query vars.
	$vars = array_unique( array_merge( $vars, array( 'meta_query', 'meta_key', 'meta_value', 'meta_compare' ) ) );

	foreach ( $vars as $var ) {
		if ( isset( $filter[ $var ] ) ) {
			$args[ $var ] = $filter[ $var ];
		}
	}
	return $args;
}

//wordpressに用意されているアクションフックで独自APIを作成します。
add_action('rest_api_init', function() {
    register_rest_route( 'wp/v2', '/org_api', array(
        'methods' => 'GET',
        'callback' => 'org_api',
    ));
});
function org_api() {

	$contents = array();//return用の配列を準備
    $myQuery = new WP_Query();//取得したいデータを設定
    $param = array(
      'post_type' => array( 'post', 'custom'), // 投稿タイプ名を入れる
      'paged' => get_query_var('paged'), //注意２：ページ送りを機能させる
      'posts_per_page'   => -1,
      'orderby'          => 'date',
      'order'            => 'DESC',
      'post_status'      => 'publish',
      'caller_get_posts' => 1
    );

    $myQuery->query($param);
     if($myQuery->have_posts()):
         while ( $myQuery->have_posts() ) : $myQuery->the_post();
                $ID = get_the_ID();
				$SLUG = get_post_type( $ID );
                array_push($contents, array(
                    "id" => $ID,
					"slug" => $SLUG
                ));
         endwhile;
     endif;
     return $contents;// WP REST APIを利用するときはjsonで返ってくる様に設定されているので、json_encodeは必要ありません。
 }


