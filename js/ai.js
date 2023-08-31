const getData = async (isSeeMore) => {
  toggleSeeMore(true);
  handleSpinner(true);
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const data = await response.json();
  const cardsData = data.data.tools;
  displayCard(cardsData, isSeeMore);
};

const displayCard = (cardsData, isSeeMore) => {
  //   console.log(cardsData);
  //   console.log(cardsData.length);

  //   console.log(isSeeMore);

  if (!isSeeMore) {
    cardsData = cardsData.slice(0, 6);
  }

  const seeMoreElement = document.getElementById("see-more");
  if (cardsData.length > 6) {
    seeMoreElement.classList.add("hidden");
  } else {
    seeMoreElement.classList.remove("hidden");
  }
  const cardsContainer = document.getElementById("cards-container");

  cardsData.forEach((cardData) => {
    // console.log(cardData.id);
    // console.log(cardData);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "bg-base-100", "border", "shadow-sm");
    cardDiv.innerHTML = `
    <figure class="p-5 ">
        <img class="rounded-lg h-[300px]" src="${
          cardData.image ? cardData.image : "./images/ai.jpeg"
        }" alt="AI Tech" />
    </figure>
    <div class="card-body">
        <h2 class="card-title font-semibold">
        Feature
        </h2>
        <ol class="border-b">
            <li class="text-gray-600">${1 + ". " + cardData.features[0]} </li>
            <li class="text-gray-600">${2 + ". " + cardData.features[1]} </li>
            <li class="mb-4 text-gray-600">${
              3 + ". " + cardData.features[2]
            }</li>
         </ol>
        <div class="mt-4">
        
            <div class="flex justify-between items-center">
                <div class="flex flex-col gap-2">
                    <div class="text-2xl font-semibold"> ${cardData.name} </div>

                    <div class="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    <span class="text-gray-600"> ${
                      cardData.published_in
                    } </span>
                </div>
            </div>
            <div>
                <div onclick="getExactCard('${
                  cardData.id
                }')" class=" bg-red-100/50 p-2 rounded-full hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1" stroke="currentColor" class="w-5 h-5 text-red-700">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
    </div>    
    `;
    cardsContainer.appendChild(cardDiv);
  });
  handleSpinner(false);
};

// Handle See More button

const toggleSeeMore = (isShowing) => {
  const seeMoreButton = document.getElementById("see-more");
  if (isShowing) {
    seeMoreButton.classList.add("hidden");
  }
};

const seeMore = () => {
  getData(true);
};

// Handle Spinnner

const handleSpinner = (isSpining) => {
  const handleSpinnerElement = document.getElementById("spinner-element");
  if (isSpining) {
    handleSpinnerElement.classList.remove("hidden");
  } else {
    handleSpinnerElement.classList.add("hidden");
  }
};

// Modal Related Work

const getExactCard = async (id) => {
  //   console.log(id);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await response.json();
  const exactData = data.data;
  //   console.log(exactData);
  showSingleCardDetails(exactData);
};

const showSingleCardDetails = (cardData) => {
  console.log(cardData);

  const modalViewElement = document.getElementById("modal-view");
  console.log(modalViewElement);

  modalViewElement.innerHTML = `
  
  <div class="relative flex flex-wrap md:flex-nowrap gap-5 items-stretch justify-between p-8">


  <div id="left-par" class="lg:w-1/2 border border-red-200 p-6 space-y-6 bg-red-50/50 rounded-lg">
      <div>
          <p class="text-2xl text-black font-semibold"> ${cardData.description} </p>
      </div>

      <div class="flex gap-4 justify-between items-center">
          <div class="bg-white flex-1 p-4 text-center rounded-lg text-base font-bold text-green-600">
              <div> ${cardData.pricing[0].price} </div>
              <div> ${cardData.pricing[0].plan} </div>
          </div>
          <div class="bg-white flex-1 p-4 text-center rounded-lg text-base font-bold text-orange-600">
              <div> ${cardData.pricing[1].price} </div>
              <div> ${cardData.pricing[1].plan} </div>
          </div>
          <div class="bg-white flex-1 p-4 text-center rounded-lg text-base font-bold text-red-600">
              <div> ${cardData.pricing[2].price} </div>
              <div> ${cardData.pricing[2].plan} </div>
          </div>
    
      </div>

      <div class="flex gap-1">
          <div class="flex-1">
              <div class= "mb-1">
                  <h3 class="text-2xl font-semibold text-black">Features</h3>
              </div>
              <ul class="list-disc list-inside">
                  <li class="text-gray-600"> ${cardData.features["1"]?.feature_name} </li>
                  <li class="text-gray-600"> ${cardData.features["2"]?.feature_name} </li>
                  <li class="text-gray-600"> ${cardData.features["3"]?.feature_name} </li>
              </ul>
          </div>

          <div class= "">
              <div class= "mb-1">
                  <h3 class="text-2xl font-semibold text-black">Integration</h3>
              </div>
              <ul class="list-disc list-inside">
                  <li class="text-gray-600"> ${cardData.integrations[0]} </li>
                  <li class="text-gray-600"> ${cardData.integrations[1]} </li>
                  <li class="text-gray-600"> ${cardData.integrations[2]} </li>
              </ul>
          </div>
      </div>

  </div>




  <div id="right-par" class="lg:w-1/2 border rounded-lg p-6 space-y-6">
      <div>
          <img class="h-[300px] rounded-lg" src=" ${cardData.image_link[0]} " alt="">
      </div>
      <div>
          <div class="mt-4">
              <h2 class="text-2xl font-semibold text-black text-center">Hi, how are you doing
                  today?</h2>
          </div>
          <div>
              <p class="text-base text-gray-600 text-center">I'm doing well, thank you for asking.
                  How can I
                  assist you today?</p>
          </div>
      </div>
  </div>


  <div class="modal-action inline-block absolute -top-12 -right-6">
    <button class="rounded-full bg-rose-500 p-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
      class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
</div>

</div>



  `;

  // Open Modal from Daisy UI
  open_modal.showModal();
};

getData();
