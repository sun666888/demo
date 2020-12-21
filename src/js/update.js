var obj = []
function updateFront(event) {
	console.log('应用了')
	var e = window.event || event;
	var formData = new FormData();
	formData.append('image', e.target.files[0]);
	// console.log(formData.get('image'))
	$.ajax({
		url: "https://www.shyy6688.com/workorders/public/index.php/api/image",
		type: 'post',
		dataType: 'JSON',
		data: formData,
		processData: false,
		contentType: false,
		success: function (res) {
			console.log(res)
			let data = JSON.parse(res)
			// let data = res
			// console.log(res)
			if (data.code == 200) {
				url = data.data.path
				// $('#imgFront').attr('src', 'https://www.shyy6688.com/workorders/uploads/images/' + idcorda.path)
				$('.imgList').append("<img src='https://www.shyy6688.com/workorders/uploads/images/" + url +"' width='100%' />")
				obj.push(url)
				console.log(obj)
			}
		},
	})
}
export { //很关键
	updateFront
   }
