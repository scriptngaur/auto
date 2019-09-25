/** 
 * UnGrabber - Most effective way to protect your online content from being copied.
 * Exclusively on Envato Market: https://1.envato.market/ungrabber
 * 
 * @encoding     UTF-8
 * @version      1.0.0
 * @copyright    Copyright (C) 2019 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license      Envato Standard License https://1.envato.market/KYbje
 * @author       Alexandr Khmelnytsky (info@alexander.khmelnitskiy.ua)
 * @support      dmitry@merkulov.design
 **/

"use strict";

const UnGrabber = ( function () {

    "use strict";
    
    function _ungrabber() {
        
        function init() {
         
            /** Disable Select All. */
            if ( mdp_ungrabber.md_select_all == 'true' ) { disable_select_all(); }
            
            /** Disable Copy. */
            if ( mdp_ungrabber.md_copy == 'true' ) { disable_copy(); }
            
            /** Disable Cut. */
            if ( mdp_ungrabber.md_cut == 'true' ) { disable_cut(); }
            
            /** Disable Paste. */
            if ( mdp_ungrabber.md_paste == 'true' ) { disable_paste(); }
            
            /** Disable Save. */
            if ( mdp_ungrabber.md_save == 'true' ) { disable_save(); }
            
            /** Disable View Source. */
            if ( mdp_ungrabber.md_view_source == 'true' ) { disable_view_source(); }
            
            /** Disable Print Page. */
            if ( mdp_ungrabber.md_print_page == 'true' ) { disable_print_page(); }
            
            /** Disable Developer Tool. */
            if ( mdp_ungrabber.md_print_page == 'true' ) { disable_developer_tool(); }
            
            /** Disable Right Click. */
            if ( mdp_ungrabber.md_right_click == 'true' ) { disable_right_click(); }
            
            /** Disable Text Selection. */
            if ( mdp_ungrabber.md_text_selection == 'true' ) { disable_text_selection(); }
                         
            /** Disable Image Dragging by Mouse. */
            if ( mdp_ungrabber.md_image_dragging == 'true' ) { disable_image_dragging(); }
        
        }
        
        /**
         * Disable Select All, HotKeys: Ctrl+A, ⌘+A.
         * Protect Your Text from Being Copied by Select All HotKeys.
         **/
        function disable_select_all() {
            
            disable_key( 65 ); // Ctrl+A, ⌘+A.
            
        }
        
        /**
         * Disable Copy, HotKeys: Ctrl+C, ⌘+C.
         * Protect Your Text from Being Copied by Copy HotKeys.
         **/
        function disable_copy() {
            
            disable_key( 67 ); // Ctrl+C, ⌘+C.
            
        }
        
        /**
         * Disable Cut, HotKeys: Ctrl+X, ⌘+X.
         * Protect Your Text from Being Copied by Cut HotKeys.
         **/
        function disable_cut() {
            
            disable_key( 88 ); // Ctrl+X, ⌘+X.
            
        }
        
        /**
         * Disable Paste, HotKeys: Ctrl+V, ⌘+V.
         * Disable Peaste HotKeys.
         **/
        function disable_paste() {
            
            disable_key( 86 ); // Ctrl+V, ⌘+V.
            
        }
        
        /**
         * Disable Save, HotKeys: Ctrl+S, ⌘+S.
         * Protect Your Text from Being Saved by Save HotKeys.
         **/
        function disable_save() {
            
            disable_key( 83 ); // Ctrl+S, ⌘+S.
            
        }
        
        /**
         * Disable View Source, HotKeys: Ctrl+U, ⌘+U.
         * Disable to View Source Code of Page by HotKeys.
         **/
        function disable_view_source() {
            
            disable_key( 85 ); // Ctrl+U, ⌘+U.
            
        }
        
        /**
         * Disable Print Page, HotKeys: Ctrl+P, ⌘+P.
         * Protect Your Page from Being Printed by HotKeys.
         **/
        function disable_print_page() {
            
            disable_key( 80 ); // Ctrl+P, ⌘+P.
            
        }
        
        /**
         * Disable Developer Tool, HotKeys: Ctrl+Shift+I, ⌘+⌥+I, F12
         * Disable to View Source Code of Page by Developer Tools.
         **/
        function disable_developer_tool() {
                        
            window.addEventListener( 'keydown', function( e ) {
                
                if (
                    e.keyCode == 123 || // F12
                    ( ( e.ctrlKey || e.metaKey ) && e.shiftKey && e.keyCode == 73 ) // Ctrl+Shift+I, ⌘+⌥+I
                ) {
                    e.preventDefault();
                }
                
            } );
            
        }
        
        /**
         * Disable Right Click, Context Menu by Mouse Right Click.
         * Protect Your Content from Being Copied by Context Menu.
         **/
        function disable_right_click() {
            
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
            
        }
        
        /**
         * Disable Text Selection.
         * Disable Text Highlight (Text Selection) by Mouse.
         **/
        function disable_text_selection() {
            
            if ( typeof document.body.onselectstart != 'undefined' ){
                document.body.onselectstart = function(){ return false; };
            } else if ( typeof document.body.style.MozUserSelect != 'undefined' ) {
                document.body.style.MozUserSelect = 'none';
            } else if ( typeof document.body.style.webkitUserSelect != 'undefined' ) {
                document.body.style.webkitUserSelect = 'none';
            } else {
                document.body.onmousedown = function(){ return false; };
            }

            document.body.style.cursor = 'default';
            
        }
        
        /**
         * Disable Image Dragging by Mouse.
         **/
        function disable_image_dragging() {
            
            document.ondragstart = function() { return false; };
            
        }
         
        /**
         * Disable CTRL|CMD + Key by key Code.
         **/
        function disable_key( code ) {
            
            window.addEventListener( 'keydown', function( e ) {
                
                /** For Windows Check CTRL. */
                if ( e.ctrlKey && e.which == code ) { e.preventDefault(); }
                
                /** For Mac Check Metakey. */
                if ( e.metaKey && e.which == code ) { e.preventDefault(); }
                
            } );
            
            document.keypress = function( e ) {
                
                /** For Windows Check CTRL. */
                if ( e.ctrlKey && e.which == code ) { return false; }
                
                /** For Mac Check Metakey. */
                if ( e.metaKey && e.which == code ) { return false; }
                
            };
            
        }
        
        return {
            init: init
        };
        
    }
    
    return _ungrabber;
    
} )();

document.addEventListener( 'DOMContentLoaded', function () {
    
    /** Disable plugin if page have [disable_ungrabber] Shortcode. */
    if ( typeof( mdp_ungrabber_destroyer ) !== 'undefined' ) { return; }
    
    var mdp_ungrabber = new UnGrabber();
    mdp_ungrabber.init();
    
});