export function printInfo(data , elemttHTML){

  elemttHTML.innerHTML = ""
  data.forEach( job => {

    elemttHTML.innerHTML += `
    <tr>
                    <td>
                      <div class="d-middle">
                        <img
                          src="assets/img/logo.webp"
                          alt="img-product"
                          width="60"
                          height="60"
                          class="img-fluid rounded-circle img-company"
                        />
                      </div>
                    </td>
                    <td>Riwi</td>
                    <td>${job.titleJob}</td>
                    <td>${job.location}</td>
                    <td>${job.experience}</td>
                    <td>${job.modality}</td>
                    <td>${job.salary}</td>
                    <td>
                      <button class="btn btn-primary edit" data-id=${job.id}>
                        <i class="bx bx-edit"></i>
                      </button>

                      <button class="btn btn-danger delete" data-id=${job.id}>
                        <i class="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
    
    `
    
  });
}