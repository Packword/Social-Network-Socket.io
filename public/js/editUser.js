getIdFromUrl = function() {
    let url = new URL(window.location.href);
    let paths = url.pathname.split("/");
    return paths[2];
}

renderEdit = function(){
    const id = getIdFromUrl();
    $.get("/users", function (data) {
        let users = JSON.parse(data);
        let user = users.find(e => e.id === id);
        $(".content").append(
            `
            <form method="post" action="/edit/${id}">
                <input type="text" class="form-control w-25" name="name" value="${user.name}" placeholder="Имя..">
                <input type="date" name="birthday" value="${user.birthday}"> </br>
                <input type="text" class="form-control w-25" name="email" value="${user.email}" placeholder="E-mail">
                <select name="role" id="roleSelect">
                    <option value="admin"> Админ </option>
                    <option value="user"> Пользователь </option>
                </select> </br>
                <select name="status" id="statusSelect">
                    <option value="active"> Активный </option>
                    <option value="blocked"> Заблокированный </option>
                    <option value="none"> Не подтверждённый </option>
                </select> </br>
                <button class="btn btn-success" type="submit"> Сохранить </button>
            </form>
            `
        );
        $('#roleSelect').val(user.role);
        $('#statusSelect').val(user.status);
    });
};


$(document).ready(() => {
    renderEdit();
});