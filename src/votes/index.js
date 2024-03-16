//get vote
const getData = async () => {
    const token = localStorage.getItem("voteToken");
    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.get(
      "https://vote-roan.vercel.app/vote/getvotes",
      { headers }
    );
    console.log(data);
    return data.votes;
  };

  const displayData = async () => {
    const data = await getData();
    console.log(data);
    const result = data
      .map(
        (d) =>
          `<tr>
          <td>${d.voteName}</td>
          <td>${d.VotingStatus}</td>
          <td>${d.description}</td>
          <td>${d.StartDateVote}</td>
          <td>${d.EndDateVote}</td>
          <td class=" align-items-center justify-content-center" style="column-gap=10px">
          <svg onclick="deleteCandidate('${d._id}',event)" 
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 
           by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons,
            Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448
             383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24
              24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
  
              <a href="./edit.html?id=${d._id}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
              
              </a>
          </td>
      
          </tr>
          
          `
      )
      .join("");
  
    document.querySelector(".data").innerHTML += result;
  };
//create vote
const addVote = document.querySelector(".submit");
if (addVote) {
    addVote.addEventListener("submit", async function (e) {
    const elements = e.target.elements;
    const token = localStorage.getItem("voteToken");
    e.preventDefault();
    const formData = new FormData();
    formData.append("voteName", elements["voteName"].value);
    formData.append("VotingStatus", elements["VotingStatus"].value);
    formData.append("description", elements["description"].value);
    formData.append("StartDateVote", elements["StartDateVote"].value);
    formData.append("EndDateVote", elements["EndDateVote"].value);
    formData.append("image", elements["image"].files[0]);

    const headers = { Authorization: `haneen__${token}` };
    const { data } = await axios.post(
      `https://vote-roan.vercel.app/vote/createVote`,
      formData,
      { headers }
    );
  });
  const bt = document.querySelector(".btn.btn-primary");
  bt.onclick = function () {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "The Vote has been successfully added",
      showConfirmButton: false,
      timer: 3000,
    });
  };
}
