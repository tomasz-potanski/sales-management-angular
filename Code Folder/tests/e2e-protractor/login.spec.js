describe( 'Login screen', function(){

  it( 'should contain a footer', function(){
    browser.get( '/' );

    var $footer = $( '#footer' );
    expect( $footer.isPresent() ).toBe( true );
  });
});
