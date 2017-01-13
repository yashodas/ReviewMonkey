//Amazon API url
var AmazonBaseUrl = 'https://tjstalcup.site/apac-php/index.php';
//youtube API url
//var YoutubeBaseUrl = 'https://www.googleapis.com/youtube/v3/search';

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
     resultElement += '<p>' + item.ItemAttributes.Title + ' - '
                      +item.ItemAttributes.ListPrice.FormattedPrice+'</p>';
     resultElement += '<p><img src="' + item.MediumImage.URL + '"/></p>';
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

$(function(){
  watchSubmit();
});
