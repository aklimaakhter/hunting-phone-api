const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;

    displayPhone(phones, isShowAll)
}
const displayPhone = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card card-compact bg-white space-x-2 p-4 shadow-xl '
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" class="justify-center"/></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
         </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    toggoleLoadingSpinner(false)
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    // console.log(data)
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    // const phoneName = document.getElementById('show-detail-phone-name');
    // phoneName.innerText = phone.name;
   const showDetailContainer = document.getElementById('show-detail-container');
   showDetailContainer.innerHTML= `
   <img src="${phone.image}" class="flex justify-center items-center text-center" alt ="">
   <h3 class="text-3xl my-4">Name: ${phone.name}</h3>
   <p class="my-2">Storage : ${phone.mainFeatures.storage}</p>
   <p class="my-2">DiplaySize : ${phone.mainFeatures.displaySize}</p>
   <p class="my-2">Chipset: ${phone?.mainFeatures?.chipSet}</p>
   <p class="my-2">Memory: ${phone?.mainFeatures?.memory}</p>
   <p class="my-2">Slug: ${phone.slug}</p>
   <p class="my-2">Release Date: ${phone.releaseDate}</p>
   <p class="my-2">Brand: ${phone.brand}</p>
   <p class="my-2">GPS: ${phone?.others?.GPS || 'no GPS available'
   }</p>
   <p class="my-2">GPS: ${phone?.others?.GPS ?phone?.others?.GPS : 'no GPS available in this device'
   }</p>
   `
    show_details_modal.showModal()
}
// handle search
const handleSearch = (isShowAll) => {
    toggoleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}


const toggoleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


const handleShowAll = () => {
    handleSearch(true);
}
loadPhone();
