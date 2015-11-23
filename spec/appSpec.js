describe('Frame', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './lib/views';
    loadFixtures('index.erb');
    $.holdReady(false);
  });

  it('displays the title', function() {
    expect('.heading').toContainText('Bowling Score Calculator');
  });

  it('can input a score', function() {
    $('#button1').click();
    expect($('#bowl1').text()).toEqual('1');
  });
});
