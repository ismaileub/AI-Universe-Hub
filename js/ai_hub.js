const loadData = async (isShowAll) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const aiHubs = data.data.tools;
    display(aiHubs, isShowAll);

}

const display = (aiHubs, isShowAll) => {
    const showContainer = document.getElementById('show-container');
    showContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');

    if (isShowAll) {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        aiHubs = aiHubs.slice(0, 6);

    }

    for (const aiHub of aiHubs) {
        // console.log(aiHub)
        // const showContainer = document.getElementById('show-container');

        const div = document.createElement('div');
        div.classList = `card border card-compact p-6 bg-base-100 shadow-xl`

        div.innerHTML = `
            <figure><img src="${aiHub.image}"
                                alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title text-black">Features</h2>
                            <ul class="list-disc text-[#585858] pl-5 mb-5">
                            <li>${aiHub.features[0]}</li>
                            <li>${aiHub.features[1]}</li>
                            <li>${aiHub.features[2]}</li>
                            </ul>
                            <hr>
                            
                            
                        </div>
                        <div class="flex justify-between items-center">
                           <div>
                           <h2 class="card-title text-black">${aiHub.name}</h2>
                           <div class="flex gap-2" >
                           <img src="./img/Frame (2).png" alt="">
                           <p>${aiHub.published_in}</p></div>
    
                           </div>
                           <button onclick="my_modal_5.showModal(); handleShowDetails('${aiHub.id}') "><img src="./img/Frame (1).png" alt=""></button>
                           
                        </div>
    
                        
    
            `;


        showContainer.appendChild(div);

    }


}


const handleShowAll = () => {
    loadData(true);
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const singleData = data.data
    console.log(singleData);

    showPhoneDetails(singleData);
}

const showPhoneDetails = (data) => {

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `

    <div class="grid gap-3 grid-cols-1 lg:grid-cols-2">
    <div class=" text-xl rounded-lg font-semibold p-4 border border-[#EB5757] bg-[#EB57571A]">
        <p class="text-black">${data.accuracy.description}</p>
        <div class="flex gap-3 my-3">
            <div class="bg-white    text-base text-[#03A30A] font p-3 rounded-lg">
                <p>${data.pricing[0].price}</p>

                <p>${data.pricing[0].plan}</p>

            </div>
            <div class="bg-white text-base text-[#F28927] font-semibold p-3 rounded-lg">
                <p>${data.pricing[1].price}</p>

                <p>${data.pricing[1].plan}</p>

            </div>
            <div class="bg-white text-[#EB5757] text-base font-semibold p-3 rounded-lg">
                <p>${data.pricing[2].price}</p>

                <p>${data.pricing[2].plan}</p>

            </div>
        </div>

        <div class="flex  ">
            <div>
                <h2 class="card-title text-black">Features</h2>
                <ul class="list-disc text-sm text-[#585858] pl-5 mb-5">
                    <li>${data.features[1].feature_name}</li>
                    <li>${data.features[2].feature_name}</li>
                    <li>${data.features[3].feature_name}</li>
                </ul>

            </div>
            <div>
                <h2 class="card-title text-black">Integrations</h2>
                <ul class="list-disc text-sm text-[#585858] pl-5 mb-5">
                    <li>${data.integrations[0]}</li>
                    <li>${data.integrations[1]}</li>
                    <li>${data.integrations[2]}</li>
                </ul>

            </div>
        </div>



    </div>

    <div class="border p-4 rounded-lg">
        <img src="${data.image_link[0]}" alt="">
        <h2 class="card-title text-black">${data.input_output_examples[0].input}</h2>
        <p class="text-sm text-[#585858]" >${data.input_output_examples[0].output}</p>


    </div>


</div>
        
    `

}



loadData();

