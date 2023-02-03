getIdFromUrl = function() {
    let url = new URL(window.location.href);
    let paths = url.pathname.split("/");
    return paths[2];
}

renderNews = function(){
    const id = getIdFromUrl();
    $.get("/users", function (data) {
        let users = JSON.parse(data);
        let user = users.find(e => e.id === id);
        users = users.filter(e => user.friends.includes(e.id) || e.id === id);
        for(let user of users){
            $.get(`/userNews/${user.id}`, function(data){
                for(let curNew of data) {
                    $(".news-wrap").append(
                        `
                        <div class="news-comp">
                            <b>${user.name}</b> >> ${curNew} <br/>
                        </div>
                        `
                    );
                }
            });
        }
    });
};


$(document).ready(() => {
    renderNews();
});