import jquery from '../src/jquery';

describe('custom jquery test', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="outer-0" class="outer" style="color: red; height: 100px">'
      + '  <div id="inner-0" class="inner">Test 0</div>'
      + '  <div id="inner-1" class="inner">Test 1</div>'
      + '  <div id="inner-2" class="inner">Test 2</div>'
      + '</div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('creation', () => {
    expect(jquery().elements).toEqual([document.body]);
    expect(jquery('#outer-0').elements).toEqual([...document.querySelectorAll('#outer-0')]);
    expect(jquery('.outer').elements).toEqual([...document.querySelectorAll('.outer')]);
  });

  test('add class', () => {
    jquery('#outer-0').addClass('test');
    expect(document.querySelector('#outer-0').classList.contains('test')).toEqual(true);
  });

  test('remove class', () => {
    jquery(('#outer-0')).removeClass('outer');
    expect(document.querySelector('#outer-0').classList.contains('outer')).toEqual(false);
  });

  test('append', () => {
    jquery('.inner').append('<p class="inner-p"></p>', '<span class="inner-span"></span>');
    expect(document.querySelectorAll('.inner-p').length).toEqual(3);
    document.querySelectorAll('.inner-p').forEach((element, index) => {
      expect(element.parentElement.getAttribute('id')).toEqual(`inner-${index}`);
    });
    expect(document.querySelectorAll('.inner-span').length).toEqual(3);
    document.querySelectorAll('.inner-span').forEach((element, index) => {
      expect(element.parentElement.getAttribute('id')).toEqual(`inner-${index}`);
    });
  });

  test('remove', () => {
    jquery('#inner-0').remove();
    expect(document.querySelector('#inner-0')).toEqual(null);
    jquery('div').remove('#inner-1');
    expect(document.querySelector('#inner-1')).toEqual(null);
  });

  test('text', () => {
    expect(jquery('#outer-0').text()).toEqual('Test 0  Test 1  Test 2');
  });

  test('attr', () => {
    const element = jquery('#outer-0');

    element.attr('attr', 'value');
    expect(element.attr('attr')).toEqual('value');
  });

  test('children', () => {
    const children = jquery('#outer-0').children();

    Array.from(children).forEach((element, index) => expect(element.attr('id')).toEqual(`inner-${index}`));
  });

  test('empty', () => {
    jquery('#outer-0').empty();
    expect(document.querySelector('#inner-0')).toEqual(null);
    expect(document.querySelector('#inner-1')).toEqual(null);
    expect(document.querySelector('#inner-2')).toEqual(null);
  });

  test('css get prop', () => {
    expect(jquery('#outer-0').css('color')).toEqual('red');
  });

  test('css get props', () => {
    expect(jquery('#outer-0').css(['color', 'height'])).toEqual(['red', '100px']);
  });

  test('css set prop', () => {
    jquery('#outer-0').css('color', 'black');
    expect(document.querySelector('#outer-0').style.color).toEqual('black');
  });

  test('click', () => {
    jquery('#outer-0').click(function () {
      jquery(this).addClass('click');
    });

    const selector = document.querySelector('#outer-0');
    selector.click();
    expect(document.querySelector('#outer-0').classList.contains('click')).toEqual(true);
  });

  test('each', () => {
    jquery('.inner').each(function () {
      jquery(this).addClass('test');
    });
    expect(document.querySelector('#inner-0').classList.contains('test')).toEqual(true);
    expect(document.querySelector('#inner-1').classList.contains('test')).toEqual(true);
    expect(document.querySelector('#inner-2').classList.contains('test')).toEqual(true);
  });

  test('wrap with new element from html string', () => {
    jquery('.inner').wrap('<div class="test"></div>');
    expect(document.querySelector('#inner-0').parentElement.classList.contains('test')).toEqual(true);
    expect(document.querySelector('#inner-1').parentElement.classList.contains('test')).toEqual(true);
    expect(document.querySelector('#inner-2').parentElement.classList.contains('test')).toEqual(true);
  });

  test('wrap with existing element', () => {
    jquery('#inner-0').wrap(jquery('#inner-1'));
    expect(document.querySelector('#inner-0').parentElement.classList.contains('inner')).toEqual(true);
  });
});
