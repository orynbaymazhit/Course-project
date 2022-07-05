function showMenu(){
    $('#menu-div').toggle()
}

$(function () {
    $.get('http://localhost:3000/author',(data) =>{
        localStorage.setItem('author', JSON.stringify(data))
    })
})

function getResults(e){
    let str = $('#cname').val()
    str = '?q=' + str.split(' ').join('%20')
    localStorage.setItem('query',str)
}
$(function (){
    $.get('"http://localhost:3000/courses"' + localStorage.query,(data) =>{
        $('#courses-content').html('')
        let content = ''
        let author = JSON.parse(localStorage.author)
        data.map(course => {
            author.map(author => {
                if(course.authorID == author.id){
                    content += "<div class='courses-column'>" +
                    "<img src='" + course.image + "'>" +
                    "<div class='courses-text'>" +
                        "<a href='#'>" + course.name + "</a>" +
                        "<p> " + course.description+ " </p>" +
                    "</div>" +
                    "<div class='author-row row'>"+
                        "<img src='" +  author.avatar +"'/>" +
                        "<p>" + author.name + ",<span>Author</span></p>" +
                        "<div>$29</div>" +
                    "</div>" +
                "</div>"
                }
            }) 
        })
        if (content.length > 1){
            $('#courses-content').append(content)
        } else {
            $('#courses-content').append('<p>Нету данных!</p>')
        }
    })
    localStorage.setItem('query','')
})

function nextSlide(e,id){
    let sliders = document.getElementsByClassName('sliders1')
    for (let i = 0; i < sliders.length; i++){
        sliders[i].style.display = 'none'
        sliders[i].classList.remove('animation')
    }
    document.getElementById(id).style.display = 'flex'
    document.getElementById(id).classList.toggle('animation')

    let dots = document.getElementsByClassName('dots')
    for (let i = 0; i < dots.length; i++){
        dots[i].classList.remove('active')
    }
    e.target.classList.toggle('active')
}


$(function (){
    $.get('http://localhost:3000/events',(data) =>{
        $('#event-content').html('')
        let content = ''
        data.map(event => {
            content += " <div class='event-item row'>" +
            "<div class='event-date column'>"+
               "<h1>" + event.day + "</h1>"+
               "<h3>" + event.month + "</h3>" +
            "</div>" +
            "<div class='event-name'>"+
                "<h1>" + event.name + "</h1>"+
                "<h3>" + event.place + "</h3>"+
                "<p>" + event.description + "</p>"+
            "</div>"+
            "<div class='event-img'>"+
                "<img src='" + event.image + "'/>"+
           "</div>"+
        "</div>"
        })
        $('#event-content').append(content)
    })
})

function toogleForm() {
    $('#addItem').toggle()
}
function deleteItem(id){
    $.ajax({
        url: 'http://localhost:3000/list/' + id,
        type: 'DELETE',
        success: function(result) {
            console.log(result)
        }
    });  
}
$(function (){
    $.get('http://localhost:3000/list',(data) =>{
        $('#details-content').html('')
        let content = ''
        data.map(item => {
            content += "<details>" +
            "<summary><p>" + item.summary + "</p><button onclick='deleteItem(" + item.id + ")'>x</button></summary>" +
            "<p>" + item.description + "</p>" +
        "</details>"
        })
        $('#details-content').append(content)
    })
})

function addItem(){
    let summaryText = $('#summary').val()
    let descriptionText = $('#details').val()
    let data = {
        summary: summaryText,
        description: descriptionText
    }
    $.post('http://localhost:3000/list',data,(response) =>{
        console.log('Created ITEM!')
    })
}

function sendMessage() {
    let name = $('#contactName').val()
    let email = $('#contactEmail').val()
    let message = $('#contactMessage').val()

    let contact = {
        contactName: name,
        contactEmail: email,
        contactMessage: message
    }
    $.post('http://localhost:3000/messages',contact,(response) =>{
        alert('Отправлено!')
    })
}