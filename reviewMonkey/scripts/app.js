//Amazon API url
var AmazonBaseUrl = 'https://tjstalcup.site/apac-php/index.php';
//youtube API url
var YoutubeBaseUrl = 'https://www.googleapis.com/youtube/v3/search';

//Function to get the data from the api
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: AmazonBaseUrl,
    data: {
      search: searchTerm,
      category: 'Electronics',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

//function to display the search results
function displayAmazonSearchData(data) {
  var resultElement = '';
  if (data.Items.Item) {
    data.Items.Item.forEach(function(item) {
     resultElement += '<div class="result-item"><p><span class="result-item-title">' + item.ItemAttributes.Title + '</span> - '
                      +item.ItemAttributes.ListPrice.FormattedPrice+'</p>';
     resultElement += '<p><img src="' + item.MediumImage.URL + '"/></p></div>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}
//jqury function to wait seach button click
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayAmazonSearchData);
  });
}
//function to display youtube results when selected on the product
function displayYoutubeSearchResults(){
  

}
//jquery function to click on the amazon product
function clickAmazonItem(){
  $('.js-search-results').on('click','.result-item',function(){
    var query = $(this).find('span.result-item-title').text();
    alert(query);
  });
}

$(function(){
  watchSubmit();
  clickAmazonItem();
});
