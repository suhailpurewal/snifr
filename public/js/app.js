/*global $*/

var imageUrl = "http://via.placeholder.com/300x300";

var showLogin = function(){
    var emailHeader = "<h1>Email</h>";
    var emailInput = '<input type="text" id="email" required>';
    var passwordHeader = "<h1>Password</h>";
    var passwordInput = '<input type="password" id="password" required>';
    
    $("#loginPanelRowTwoColOne" ).empty();
    $("#loginPanelRowTwoColTwo" ).empty();
    $("#loginPanelRowTwoColOne").append(emailHeader, emailInput);
    $("#loginPanelRowTwoColTwo").append(passwordHeader, passwordInput);
    $("#loginPanelRowTwoColOne").attr("id", "loginPanelEmailLogin");
    $("#loginPanelRowTwoColTwo").attr("id", "loginPanelEmailPassword");
    $("#LPbutLoginSubmit").removeClass("hiddenBtn");
}
var aboutShow = function(){
        $("#aboutInfo").removeClass("hiddenBtn");
};

var submitLogin = function(){
     let email = $("#email").val().trim();
            $("#email").val("");
            let password = $("#password").val().trim();
            console.log(email);
            console.log(password);
            
            $.post("/signin", {
                username: email,
                password: password
            }).then(data => {
                console.log(data);
                if (data.authorized === "YES"){
                    window.location.replace('/home');
                }
            });
};

var gotoSignup = function(){
    window.location.replace('/user');
}

var signup = function(){
    let name = $("#humanName").val().trim();
            let zip = $("#zipCode").val().trim();
            let email = $("#email").val().trim();
            let password = $("#password").val().trim();
            
            $.post("/signup", {
                name: name,
                zip: zip,
                email: email,
                password: password
            }).then(function(data){
                console.log(data);
                if (data.signup === "success"){
                    window.location.replace(`/user/${data.user}/dog`);
                }
            })
}

var addDog = function(){
    let name = $("#dogName").val().trim();
    let breed = $("#breed").val().trim();
    let age = parseInt($("#age").val().trim(), 10);
    let sex = $("#sex").val();
    let size = $("#size").val();
    let temperament = $("#temperament").val();
    let fixed = $("#fixed").val();
    //let photo = "/tempurl";
    let photo = imageUrl;
    let description = $("#description").val().trim();
    
    let data = {
        name, breed, age, sex, size,
        temperament, fixed, photo, description
    }
    
    console.log(data);
    let href = window.location.href;
    $.post(href, data).then(resp => {
        console.log(resp)
        let dogId = resp.dogId;
        console.log(dogId)
        href += `/${dogId}/survey`
        window.location.replace(href);
    })
}

var addSurvey = function(){
    let questions = Array.from($(".question"));
    var data = {};
    questions.forEach(q => {
        data[q.id] = parseInt($(q).val());
        console.log(q.id)
        console.log($(q).val());
    });
    console.log(data);
    
    $.post(window.location.href, data).then(resp => {
        console.log(resp);
        let href = window.location.href;
        href = href.replace("survey", "filter");
        window.location.replace(href);
    })
}

var addFilter = function(){
    let sex = $("#sex").val();
    let fixed = $("#fixed").val();
    let size = $("#size").val();
    let temperament = $("temperament").val();
    
    if (sex === "NA"){
        sex = null;

    }
    if (fixed === "NA"){
        sex = null;
    }
    if (size === "NA"){
        size = null;
    }
    if (temperament === "NA"){
        temperament = null;
    }
    let data = {sex_pref: sex, fixed_pref: fixed, size_pref: size, temperament_pref: temperament}
    
    $.post(window.location.href, data).then(resp => {
        console.log(resp);
        window.location.replace(`/profile/${resp.dogId}`);
    })
}

var updateProfile = function(){
    let data = {
        name: $("#dogName").val().trim(),
        breed: $("#breed").val().trim(),
        age: parseInt($("#age").val(), 10),
        photo: imageUrl,
        description: $("#description").val().trim(),
        sex: $("#sex").val(),
        fixed: $("#fixed").val(),
        size: $("#size").val(),
        temperament: $("#temperament").val()
    };
    
    $.ajax({
        url: '/api/profile',
        method: 'PUT',
        data: data
    }).then(resp => {
        console.log(resp);
        if (resp.status === "SUCCESS"){
            window.location.replace('/home')
        }
    })
}

var updateSurvey = function(){
    let data = {};
    $(".question").map((i, q) => {
        data[q.id] = parseInt(q.value, 10);
        //$(q).val();
        //console.log(q.value);
    });
    console.log(data);
    $.ajax({
        url: '/api/survey',
        method: 'PUT',
        data: data
    }).then(resp => {
        console.log(resp);
        if (resp.status === "SUCCESS"){
            window.location.replace('/home')
        }
    })
}

$(document).ready(function(){

    let updateFilterBtn = $("#updateFilter");
    if (updateFilterBtn.length > 0){
        $.getJSON('/api/filter', data => {
            console.log(data);
            if (data.fixed_pref){
                $(`#fixed option[value="${data.fixed_pref}"`).attr("selected", "selected");
            }
            if (data.sex_pref){
                $(`#sex option[value="${data.sex_pref}"`).attr("selected", "selected");
            }
            if (data.size_pref){
                $(`#size option[value="${data.size_pref}"`).attr("selected", "selected");
            }
            if (data.temperament_pref){
                $(`#temperament option[value="${data.temperament_pref}"`).attr("selected", "selected");
            }
        })
    }
    
    let updateDog = $("#updateProfile")
    if (updateDog.length > 0){
        $.getJSON('/api/profile', data => {
            console.log(data);
            $("#dogName").val(data.name);
            $("#breed").val(data.breed);
            $("#age").val(data.age);
            imageUrl = data.photo;
            $("#description").val(data.description);
            $(`#sex option[value="${data.sex}"]`).attr("selected", "selected");
            $(`#fixed option[value="${data.fixed}"]`).attr("selected", "selected");
            $(`#size option[value="${data.size}"]`).attr("selected", "selected");
            $(`#temperament option[value="${data.temperament}"]`).attr("selected", "selected");
        });
    } else {
        console.log("not update page");
    }
    
    let updateSurveyBtn = $("#updateSurvey");
    if (updateSurveyBtn.length > 0){
        $.getJSON('/api/survey', data => {
            console.log(data);
            $(".question").map((i, q) => {
                console.log(q.id);
                $(`#${q.id} option[value="${data[q.id]}"`).attr("selected", "selected");
                //console.log(data[`q.id`]);
            })
        })
    }
    
    $("#updateProfile").click(updateProfile);
    $("#updateSurvey").click(updateSurvey);
    $("#about").on("click", aboutShow);
    $( "#LPbutLogin" ).on("click", showLogin);
    $("#LPbutLoginSubmit").click(submitLogin);
    $("#LPbutJoin").click(gotoSignup);
    $("#submitUser").click(signup);
    $("#submitDog").click(addDog);
    $("#submitSurvey").click(addSurvey);
    $("#submitFilter").click(addFilter);

    var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dakke3tr6/upload';
    var CLOUDINARY_UPLOAD_PRESET = 'i2fwawg4'
    
    // var imgPreview = document.getElementById('img-preview');
    var fileUpload = document.getElementById('file-upload');
    
    fileUpload.addEventListener('change', function(event){
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    console.log(file)
    
    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function(res){
    console.log(res)
    console.log(res.data.url)
    imageUrl = res.data.secure_url;
    
    // imgPreview.src = res.data.secure_url;
    }).catch(function(err){
        console.error(err)
    })
    
    });
    // storing scores as array
    // $(".submitBtn").on("click", function() {
    //     console.log("CLICKEDJKASDJAKLSD")
    //     var scores =  [];
    //     // for loop to run through chosen answer values
    //     for (i = 1; i < 11; i++) {
    //         var newVal = $('#q' + i).val();
    //         scores.push(parseInt(newVal));
    //     }
    //     event.preventDefault();
    //     console.log(scores);
    });
