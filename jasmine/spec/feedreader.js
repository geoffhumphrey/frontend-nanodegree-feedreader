/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined, buddy', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('each feed has a URL defined and present, little guy', function(){
            allFeeds.forEach(function(data) {
                expect(data.url).toBeDefined();
                expect(data.url).not.toBe(null);
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has a name defined and present, hot rod', function(){
            allFeeds.forEach(function(data) {
                expect(data.name).toBeDefined();
                expect(data.name).not.toBe(null);
            });
         });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu element is hidden by default, sport', function() {

            // Ensure it has the menu-hidden class attached to it in the DOM upon page load
            expect($('body').hasClass('menu-hidden')).toBe(true);

            // Use the toBeTruthy matcher to see if the menu-hidden class present in the DOM
            expect($('menu-hidden')).toBeTruthy();

         });

        /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

        // Help: https://discussions.udacity.com/t/menu-hidden-failing-even-though-clicked-removed/263809/2
        // Help: https://discussions.udacity.com/t/cant-figure-out-menu-suite-test-should-hide-menu-fails/395425
        // Help: https://discussions.udacity.com/t/looking-for-jasmine-useful-documenation-please/410627
        it('menu changes visibility when clicked, partner', function(){

            // Trigger a click of the a.menu-icon-link element
            // then see if the class menu-hidden is false -
            // menu-hidden is true upon page load
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            // Trigger another click of the a.menu-icon-link element
            // then see if the class menu-hidden is true
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        })
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // Use beforeEach to delay the firing of the function (since it is async)
        // by using Jasmine's done() function
        // Also include a timeout to make sure all async functions have time to fully load
        // Help: https://jasmine.github.io/2.1/introduction.html#section-Asynchronous_Support
        // Help: https://discussions.udacity.com/t/testing-feed-container-for-content-for-every-feed/240845/6
        beforeEach(function (done) {
            setTimeout(function() {
                loadFeed(0,done);
            }, 1000);
        });

        // Help: https://discussions.udacity.com/t/step-13-help-initial-entries/14839/9
        it('feeds loaded, man', function(done) {
            // check to see if the .entry child class of the .feed class has been instantiated at least once
            // that will indicate that the feeds have been loaded
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Help: https://discussions.udacity.com/t/cannot-understand-how-to-write-new-feed-selection-test/246709/4
        var oldFeed;
        var newFeed;

        // Use beforeEach to delay the firing of the function (since it is async)
        // by using Jasmine's done() function
        // Load a feed, capture it
        beforeEach(function (done) {
            loadFeed(0, function(){
                oldFeed = $('.feed').html();
                done();
            });
        });

        // Then, load another feed
        // Capture it and compare with the previous feed
        // Make sure that they are not the same
        it('changes the feed, little buddy', function(done) {
            // Fire the loadFeed function, passing a new value to get a different feed
            loadFeed(1, function() {
                newFeed = $('.feed').html();
                expect(oldFeed).not.toEqual(newFeed);
                done();
            });
        });

    });

}());
