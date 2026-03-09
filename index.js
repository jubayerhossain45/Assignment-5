const API =
"https://phi-lab-server.vercel.app/api/v1/lab/issues"



function login(){

const user =
document.getElementById("username").value

const pass =
document.getElementById("password").value

if(user==="admin" && pass==="admin123"){

document.getElementById("loginPage")
.classList.add("hidden")

document.getElementById("mainPage")
.classList.remove("hidden")

loadIssues("all")

}else{

alert("Wrong Credentials")

}

 }



async function loadIssues(type){

setActiveTab(type)

document.getElementById("loader")
.classList.remove("hidden")

const res = await fetch(API)

const data = await res.json()

let issues = data.data


if(type==="open"){

issues = issues.filter(
i => i.status==="open"
)

}

if(type==="closed"){

issues = issues.filter(
i => i.status==="closed"
)

}


displayIssues(issues)

document.getElementById("loader")
.classList.add("hidden")

}



function displayIssues(issues){

const container =
document.getElementById("issuesContainer")

container.innerHTML=""

document.getElementById("issueCount")
.innerText = issues.length

issues.forEach(issue=>{

const border =
issue.status==="open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500"


const card = document.createElement("div")

card.className =
`bg-white p-4 rounded shadow ${border}`

card.innerHTML=`

<div class="flex justify-between">

<span class="  px-2 py-1 rounded-full">
<img src="./assets/Open-Status.png" class="w-4 h-4 inline">
</span>
<span class=" bg-red-100 text-red-500 px-2 font-semibold rounded-full">
${issue.priority}
</span>


</div>

<h3
onclick="showModal(${issue.id})"
class="font-semibold cursor-pointer mt-2 hover:text-purple-600">

${issue.title}

</h3>

<p class="text-sm text-gray-500 mt-2">

${issue.description}

</p>

<div class="flex gap-2 mt-3 text-xs">

<span class="bg-red-200 text-yellow-700 px-2 py-1 rounded">
${issue.labels[0]}
</span>
<span class="bg-yellow-200 text-orange-700 px-2 py-1 rounded">
${issue.labels[1]}
</span>

 

</div>

<p>____________________________________</p>

<div class="mt-3 text-xs text-gray-500 ">

#${issue.id} by ${issue.author}

<br>

${issue.createdAt}

</div>

`

container.appendChild(card)

})

}



async function showModal(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()

const issue = data.data

document.getElementById("modalTitle")
.innerText = issue.title
document.getElementById("modalInfo")
.innerText =
` *Open by ${issue.author}`
document.getElementById("modalInfo2")
.innerText =
`* ${issue.createdAt}`
document.getElementById("modalInfo3")
.innerText =
` ${issue.labels[0]}`
document.getElementById("modalInfo4")
.innerText =
` ${issue.labels[1]}`
document.getElementById("modalInfo5")
.innerText =
` ${issue.author}`
document.getElementById("modalInfo6")
.innerText =
` ${issue.priority}`
document.getElementById("modalDesc")
.innerText = issue.description
 

document.getElementById("modal")
.classList.remove("hidden")

document.getElementById("modal")
.classList.add("flex")

}



function closeModal(){

document.getElementById("modal")
.classList.add("hidden")

}



function setActiveTab(type){

document.querySelectorAll(".tab")
.forEach(btn=>{

btn.classList.remove(
"bg-purple-600","text-white"
)

})

const active =
document.getElementById(`tab-${type}`)

if(active){

active.classList.add(
"bg-purple-600","text-white"
)

}

}





async function searchIssue(){

const text =
document.getElementById("searchInput").value

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

const data = await res.json()

displayIssues(data.data)

  }