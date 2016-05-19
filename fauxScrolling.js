
    fauxParallax: function(){
        function cssProp( scrollingTranslateVal, divisor ){
            return {
                '-webkit-transform': 'translate( 0, ' + scrollingTranslateVal/divisor + '% )',
                '-ms-transform': 'translate( 0, ' + scrollingTranslateVal/divisor + '% )',
                'transform': 'translate( 0, ' + scrollingTranslateVal/divisor + '% )'
            }
        }

        if(!mobile){
            el = $( '.content-images-left.multiple:not(.tia)' );
            el.find( '.primary-image' ).css( cssProp( 100, -4 ) );
            el.find( '.secondary-image' ).css( cssProp( 100, 4 ) );
            el.find( '.stat-container' ).css( cssProp( 100, 0.5 ) );
            el.find( '.red-border' ).css( cssProp( 100, 2 ) );

            el.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
                var $this = $( event.currentTarget );

                var windowHeight, containerOffset, containerHeight, windowScroll;
                windowHeight = $( window ).outerHeight() * 0.75;
                containerOffset = $this.offset().top;
                containerHeight = $this.outerHeight();
                windowScroll = $( window ).scrollTop();

                if (isInView ) {
                    $this.addClass( 'inview' );

                    $( window ).scroll( function(){
                        windowScroll = $( window ).scrollTop();
                        var scrollingTranslate = 100 - ( windowScroll + windowHeight - containerOffset ) / containerHeight * 100;

                        if( containerOffset <= windowScroll + windowHeight && containerOffset + containerHeight > windowScroll + windowHeight ) {
                            $this.find( '.primary-image' ).css( cssProp( scrollingTranslate, -4 ) );
                            $this.find( '.secondary-image' ).css( cssProp( scrollingTranslate, 4 ) );
                            $this.find( '.stat-container' ).css( cssProp( scrollingTranslate, 0.5 ) );
                            $this.find( '.red-border' ).css( cssProp( scrollingTranslate, 2 ) );
                        }
                        if( containerOffset + containerHeight < windowScroll + windowHeight ) {
                            $this.find( '.primary-image' ).css( cssProp( 0, 1 ) );
                            $this.find( '.secondary-image' ).css( cssProp( 0, 1 ) );
                            $this.find( '.stat-container' ).css( cssProp( 0, 1 ) );
                            $this.find( '.red-border' ).css( cssProp( 0, 1 ) );
                        }
                    });
                } else {
                    $this.removeClass( 'inview' );
                }
            });
        }
    }
