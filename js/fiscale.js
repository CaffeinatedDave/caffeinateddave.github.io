populateCountries = () => {
  
}

populateProvinces = () => {
}

populateCities = () => {

}

generateCard = () => {
  $('#card').text("Generated...")
}

$(document).ready(() => {
  $('#dob').datetimepicker({
    format: 'DD/MM/YYYY',
    viewMode: 'years'
  });
  populateCountries();
})
