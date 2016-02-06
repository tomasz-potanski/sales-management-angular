describe( 'Home page', function(){

  it( 'user should be able to log in', function(){
    browser.get( '/' );

    var $usernameInput = $( '#login-name' );
    var $passInput = $( '#login-pass' );
    var $submitButton = $( '.submit-btn' );

    $usernameInput.sendKeys('Mao');
    $passInput.sendKeys('Mao');
    $submitButton.click();

    browser.sleep( 2000 );

    browser.getLocationAbsUrl().then( function ( url ) {
      expect( url ).toEqual( '/home' );
    } );

  });

  it( 'should contain 4 charts', function(){
    var $$charts = $$( '.gridster-item' );
    expect( $$charts.count() ).toEqual( 4 );
  });
});
