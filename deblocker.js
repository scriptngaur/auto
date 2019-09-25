/** 
 * DeBlocker - Most effective way to detect ad blockers. Ask the visitors to disable their ad blockers.
 * Exclusively on Envato Market: https://1.envato.market/deblocker
 * 
 * @encoding     UTF-8
 * @version      1.0.2
 * @copyright    Copyright (C) 2019 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license      Envato Standard License https://1.envato.market/KYbje
 * @author       Alexandr Khmelnytsky (info@alexander.khmelnitskiy.ua)
 * @support      dmitry@merkulov.design
 **/

"use strict";

document.addEventListener( 'DOMContentLoaded', function () {
    
    /** Disable plugin if page have Shortcode. */
    if ( typeof( mdp_deblocker_destroyer ) !== 'undefined' ) { return; }
    
    /** Detect ad blockers. */
    adsBlocked( function ( blocked ) {
        if ( blocked ) {
            showModal();
        
        /** Check by two different methodsю */
        } else if ( ! document.getElementById( 'mdp-deblocker-ads' ) ) { 
            
            showModal();
        }
        
    } );
    
    /** Disable text selection on page. */
    function disableSelection( e ){
        
        if ( typeof e.onselectstart != 'undefined' ){
            e.onselectstart = function(){ return false; };
        } else if ( typeof e.style.MozUserSelect != 'undefined' ) {
            e.style.MozUserSelect = 'none';
        } else if ( typeof e.style.webkitUserSelect != 'undefined' ) {
            e.style.webkitUserSelect = 'none';
        } else {
            e.onmousedown = function(){ return false; };
        }
        
        e.style.cursor = 'default';
    }
    
    /** Enable text selection on page. */
    function enableSelection( e ){
        
        if ( typeof e.onselectstart != 'undefined' ){
            e.onselectstart = function(){ return true; };
        } else if ( typeof e.style.MozUserSelect != 'undefined' ) {
            e.style.MozUserSelect = 'text';
        } else if ( typeof e.style.webkitUserSelect != 'undefined' ) {
            e.style.webkitUserSelect = 'text';
        } else {
            e.onmousedown = function(){ return true; };
        }
        
        e.style.cursor = 'auto';
    }
    
    /** Disable context menu on page. */
    function disableContextMenu() {
        document.oncontextmenu = function( e ) { 
            var t = e || window.event;
            var n = t.target || t.srcElement;
            
            if ( n.nodeName != 'A' ) {
                return false;  
            }
        };
        
        document.body.oncontextmenu = function () {
            return false;
        };
        
        document.ondragstart = function() { return false; };
    }

    /** Enable context menu on page. */
    function enableContextMenu() {
        document.oncontextmenu = function( e ) { 
            var t = e || window.event;
            var n = t.target || t.srcElement;
            
            if ( n.nodeName != 'A' ) {
                return true;  
            } 
        };
        
        document.ondragstart = function() { return true; };
    }
    
    var h_win_disableHotKeys;
    var h_mac_disableHotKeys;
    
    /** Disable HotKeys on page. */
    function disableHotKeys() {
        
        h_win_disableHotKeys = function( e ) { 
            if( 
                e.ctrlKey && 
                ( 
                    e.which == 65 || 
                    e.which == 66 || 
                    e.which == 67 ||
                    e.which == 70 ||
                    e.which == 73 ||
                    e.which == 80 ||
                    e.which == 83 ||
                    e.which == 85 ||
                    e.which == 86
                )
            ) {
                e.preventDefault();
            }
        };
        
        /** For Windows check ctrl. */
        window.addEventListener( 'keydown', h_win_disableHotKeys );
        
        document.keypress = function( e ) {
            if( 
                e.ctrlKey && 
                (
                    e.which == 65 ||
                    e.which == 66 ||
                    e.which == 70 ||
                    e.which == 67 ||
                    e.which == 73 ||
                    e.which == 80 ||
                    e.which == 83 ||
                    e.which == 85 ||
                    e.which == 86
                ) 
            ) {
                return false;
            }
            
        };
        
        h_mac_disableHotKeys = function( e ) { 
            if( 
                e.metaKey && 
                (
                    e.which == 65 ||
                    e.which == 66 ||
                    e.which == 67 ||
                    e.which == 70 ||
                    e.which == 73 ||
                    e.which == 80 ||
                    e.which == 83 ||
                    e.which == 85 ||
                    e.which == 86
                )
            ) { 
                e.preventDefault();
            }
        };
        
        /** For mac check metakey. */
        window.addEventListener( 'keydown', h_mac_disableHotKeys );
        
        document.keypress = function( e ) { 
            if( 
                e.metaKey &&
                (
                    e.which == 65 ||
                    e.which == 66 ||
                    e.which == 70 ||
                    e.which == 67 ||
                    e.which == 73 ||
                    e.which == 80 ||
                    e.which == 83 ||
                    e.which == 85 ||
                    e.which == 86
                )
            ) {
                return false;
            }
            
        };
        
        /** Disable DevTools. */
        document.onkeydown = function( e ) {
            if (
                e.keyCode == 123 || // F12
                ( ( e.ctrlKey || e.metaKey ) && e.shiftKey && e.keyCode == 73 ) // CTRL+SHIFT+I, CMD+OPTION+I
            ) {
                e.preventDefault();
            }
        };

    }
    
    /** Enable HotKeys on page. */
    function enableHotKeys() {
        
        /** For Windows check ctrl. */
        window.removeEventListener( 'keydown', h_win_disableHotKeys );
        
        document.keypress = function( e ) { 
            if( 
                e.ctrlKey && 
                (
                    e.which == 65 ||
                    e.which == 66 ||
                    e.which == 70 ||
                    e.which == 67 ||
                    e.which == 73 ||
                    e.which == 80 ||
                    e.which == 83 ||
                    e.which == 85 ||
                    e.which == 86
                ) 
            ) {
                return true;
            }
        };
        
        /** For mac check metakey. */
        window.removeEventListener( 'keydown', h_mac_disableHotKeys );
        
        document.keypress = function( e ) { 
            if( 
                e.metaKey &&
                (
                    e.which == 65 ||
                    e.which == 66 ||
                    e.which == 70 ||
                    e.which == 67 ||
                    e.which == 73 ||
                    e.which == 80 ||
                    e.which == 83 ||
                    e.which == 85 ||
                    e.which == 86
                )
            ) {
                return true;
            }  
        };
        
        /** Enable DevTools. */
        document.onkeydown = function( e ) {
            e = e || window.event; 
            if ( e.keyCode == 123 || e.keyCode == 18 || ( e.ctrlKey && e.shiftKey && e.keyCode == 73 ) ) { return true; }
     
        };
    }
    
    /** Show DeBlocker Modal. */
    function showModal() {

        /** Open modal after timeout. */
        setTimeout(function () {

            /** Set Style class. */
            document.body.classList.add('mdp-deblocker-style-' + mdp_deblocker.style);

            /** Blur Content: */
            if (mdp_deblocker.blur == 'true') {
                document.body.classList.add('mdp-deblocker-blur');
            }

            /** Create body overlay. */
            var overlay = document.createElement('div');
            overlay.classList.add('mdp-deblocker-blackout');
            overlay.style.backgroundColor = mdp_deblocker.bg_color; // Set Overlay Color.
            overlay.classList.add('active');
            document.body.appendChild(overlay);

            /** Create the Modal Wrapper. */
            var modalWrapper = document.createElement('div');
            modalWrapper.classList.add('mdp-deblocker-wrapper');
            document.body.appendChild(modalWrapper);

            /** Create Modal. */
            var modal = document.createElement('div');
            modal.classList.add('mdp-deblocker-modal');
            modal.style.backgroundColor = mdp_deblocker.modal_color; // Set Modal Color.
            modal.classList.add('active');
            modalWrapper.appendChild(modal);

            /** Is it possible to close? */
            if (mdp_deblocker.closeable == 'true') {

                /** Create Close Button. */
                var close = document.createElement('span');
                close.classList.add('mdp-deblocker-close');
                close.innerHTML = '&nbsp;';
                close.setAttribute('href', '#');

                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML =
                        '.mdp-deblocker-close:after,' +
                        '.mdp-deblocker-close:before {' +
                        'background-color: ' + mdp_deblocker.text_color + ';' +
                        '}';

                var head = document.head || document.getElementsByTagName('head')[0];
                head.appendChild(style);

                /** Close Event. */
                close.addEventListener('click', function (e) {
                    e.preventDefault();
                    var elem = document.querySelector('.mdp-deblocker-modal');
                    elem.parentNode.removeChild(elem);
                    elem = document.querySelector('.mdp-deblocker-wrapper');
                    elem.parentNode.removeChild(elem);
                    elem = document.querySelector('.mdp-deblocker-blackout');
                    elem.parentNode.removeChild(elem);
                    
                    /** Remove Blur. */
                    document.body.classList.remove('mdp-deblocker-blur');
                    enableSelection( document.body );
                    enableContextMenu();
                    enableHotKeys();
                });

                modal.appendChild(close);
            }


            /** Create Title. */
            var title = document.createElement('h4');
            title.innerHTML = mdp_deblocker.title;
            title.style.color = mdp_deblocker.text_color; // Set Text Color.
            modal.appendChild(title);

            /** Create Content. */
            var content = document.createElement('div');
            content.classList.add('mdp-deblocker-content');
            content.innerHTML = mdp_deblocker.content;
            content.style.color = mdp_deblocker.text_color; // Set Text Color.
            modal.appendChild(content);
            
            disableSelection( document.body );
            disableContextMenu();
            disableHotKeys();

        }, (mdp_deblocker.timeout * 1000));

    }

    /** Detect ad blockers. */
    function adsBlocked( callback ) {
        var AdsURL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

        var RequestSettings = {
            method: 'HEAD',
            mode: 'no-cors'
        };

        var DeBlockerRequest = new Request( AdsURL, RequestSettings );

        fetch( DeBlockerRequest ).then( function ( response ) {
            return response;
        } ).then( function ( response ) {
            callback( false );
        } ).catch( function ( e ) {
            callback( true );
        });
    }
    
}, false ) ;
