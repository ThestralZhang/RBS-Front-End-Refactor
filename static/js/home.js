let waitingPicIds = [],
    imgLists = [],
    listLength = [0, 0, 0, 0],
    minLength = listLength[0],
    minListId = 0,
    likedPicIds = [],
    loadedNum = 0,
    loadable = true,
    displayingPic = {},
    displayingRmks = [],
    loggedUser,
    fileTags = [];

const imgWidth = 280,
      initNum = 30;


/**
 * in order not to call this function too frequently
 * @param gap the second call wouldn't make it during the gap
 * @returns {Function} the new version of the old function
 */
Function.prototype.throttle = function(gap){
   const that = this;
   let previous = null;
   
   return function(){
      const now = new Date();
      if(!previous)
         previous = now;
      const remaining = now - previous;
      if(gap && remaining >= gap){
         that(...arguments);
         previous = now;
      }
   };
};


$('document').ready(() => {
   initView();
   initLoad();
   loadMore();
   search();
   sketch();
   upload();
   detail();
   managePic();
});


/**
 * some fundamental jobs to support the program to run
 */
function initView() {
   //back to top when refreshing
   setTimeout(() => {
      document.body.scrollTop = 0;
      console.log(document.body.scrollTop+'eee');
   }, 150);
   
   //init variables
   imgLists = [$("#img-list-0"), $("#img-list-1"), $("#img-list-2"), $("#img-list-3")];
   loggedUser = model.users[6];
   
   //active modals
   const overlay = $('#modal-overlay');
   
   $('.modal-btn').click((e) => {
      $('body').addClass('body-overlaid');
      overlay.removeClass('no-overlay');
   });
   
   overlay.click((e) => {
      if(e.target.id !== 'modal-overlay')
         return;
      $('body').removeClass('body-overlaid');
      $('.modal').removeClass('modal-shown').addClass('modal-hidden');
      $('#last-pic').css('visibility', 'hidden');
      $('#next-pic').css('visibility', 'hidden');
      overlay.addClass('no-overlay');
   });
   
   // show logged user
   $('#avatar img').attr('src', '/media/avatars/' + loggedUser.avatar);
   
   //get pic ids
   const numArr = Array.from(new Array(210), (item, index) => index);
   waitingPicIds = numArr.randomChoose();
   
   // get all liked pic ids
   likedPicIds = model.likes.filter((item) => {
      return item.by_id === loggedUser.id;
   }).map((item) => {
      return item.pic_id;
   });
   
   // back to top btn
   const topBtn = $('#top-btn');
   let interval;
   const controlTopBtn = (function(){
      const scrollHeight = document.body.scrollTop,
         windowHeight = window.innerHeight;
      if(scrollHeight >= windowHeight)
         topBtn.css({'opacity': '1', 'bottom': '15px'});
      else
         topBtn.css({'opacity': '0', 'bottom': '5px'});
   }).throttle(100);
   
   $(window).scroll(controlTopBtn);
   topBtn.click(() => {
      let expScrollTop = document.body.scrollTop;
      interval = setInterval(() => {
         if(document.body.scrollTop !== expScrollTop)
            clearInterval(interval);
         const speed = document.body.scrollTop/8;
         expScrollTop = Math.floor(document.body.scrollTop - speed);
         document.body.scrollTop = expScrollTop;
         console.log(document.body.scrollTop + ', ' + speed);
         if(document.body.scrollTop <= 0)
            clearInterval(interval);
      }, 30);
   });
}


/**
 * when opening the page, load pics for the first time
 */
function initLoad(){
   const toLoadIds = waitingPicIds.slice(0, initNum);
   
   //create tile frames
   for(let i = 0; i < initNum; i++)
      createTile(toLoadIds[i]);
   
   //fill in the pics
   for(let i = 0; i < initNum; i++)
      loadPic(toLoadIds[i]);
}


/**
 * Tool function, given an id of a pic, it creates a tile or a LI element of the pic,
 * and decides where to place the element to make a waterfall layout as well.
 * This function does not actually load the source pic file,
 * though it simply adds a 'data-src' attribute to the IMG element instead of 'src'.
 * Before loading the source, it uses a default pic.
 * @param picId
 */
function createTile(picId) {
   // generate content
   const pic = model.pictures[picId],
         usr = model.users[pic.by_id],
         height = imgWidth * pic.height / pic.width,
         picSrc = '/media/pictures/' + pic.path,
         avatarSrc = '/media/avatars/' + usr.avatar,
         hasLiked = likedPicIds.includes(picId);
   
   const liTxt =
      '<li class="tile" id="pic'+ picId +'">' +
      '   <div class="img-wrap">' +
      '      <img src="/static/image/default.jpg" data-src="' + picSrc + '" alt="' + pic.tags.toString() + '" style="height: ' + height + 'px;"/>' +
      '   </div>' +
      '   <p class="description">' +
             pic.description +
      '   </p>' +
      '   <div class="info">' +
      '      <a href="javascript: void(0)" class="usr">' +
      '         <img src="/static/image/default.jpg" data-src="' + avatarSrc + '" alt="' + usr.name +'" class="avatar"/>' +
                usr.name +
      '      </a>' +
      '      <span class="tile-btn-wrp">' +
      '         <button class="like-btn icon-font ' + (hasLiked? 'liked':'unliked') + '">' + pic.like_num + '</button>' +
      '         <button class="remark-btn icon-font">' + pic.remark_num + '</button>' +
      '         <button class="download-btn icon-font">' + pic.down_num + '</button>' +
      '      </span>' +
      '   </div>' +
      '</li>';
   
   //find the shortest list
   for(let i = 0; i < 4; i++){
      if(listLength[i] < minLength){
         minLength = listLength[i];
         minListId = i;
      }
   }
   
   //create and add
   const tileLi = $(liTxt);
   imgLists[minListId].append(tileLi);
   listLength[minListId] += tileLi.outerHeight();
   
   //reset
   minListId = 0;
   minLength = listLength[0];
}


/**
 * Tool function, given an id of a pic, it loads the source pic file,
 * passing the value of 'data-src' to 'src'.
 * @param picId
 */
function loadPic(picId) {
   const tileEle = $('#pic' + picId),
         picEle = tileEle.find('.img-wrap img'),
         avatarEle = tileEle.find('.avatar');
   if(picEle.attr('src') === picEle.attr('data-src'))
      return;
   picEle.attr('src', picEle.attr('data-src'));
   avatarEle.attr('src', avatarEle.attr('data-src'));
   loadedNum ++;
}


/**
 * It deals with the logic when pressing 'load more' button
 * when hovering on the button, preload
 * when scrolling down, lazyload
 * preload:
 * before the pics are actually displayed on the page, load the sources. prediction of users' behavior is required
 * lazyload:
 * use the default picture to occupy the place before users really want to see the pictures
 */
function loadMore(){
   const expPreLoadNum = 12,
         expLazyLoadNum = 18,
         loadBtn = $('#load-btn');
   let toLazyLoadNum = 0,
       toLazyLoadIds = [];
   
   // when hover on the btn,
   loadBtn.mouseenter(() => {
      if(!loadable) return;
      
      const toLoadNum = Math.min(expPreLoadNum, waitingPicIds.length - loadedNum);
      const toLoadIds = waitingPicIds.slice(loadedNum, loadedNum + toLoadNum);
      let imgs = [];
      for(let i = 0; i < toLoadNum; i++){
         const img = new Image();
         img.src = '/media/pictures/' + model.pictures[toLoadIds[i]].path;
         imgs.push(img);
      }
      loadable = false;
   });
   
   // when click the btn
   loadBtn.click(() => {
      let leftNum = waitingPicIds.length - loadedNum;
      
      // preload
      const toPreLoadNum = Math.min(expPreLoadNum, leftNum);
      const toPreLoadIds = waitingPicIds.slice(loadedNum, loadedNum + toPreLoadNum);
      for(let i = 0; i < toPreLoadNum; i++){
         createTile(toPreLoadIds[i]);
         loadPic(toPreLoadIds[i]);
      }
      
      // lazy load
      leftNum = waitingPicIds.length - loadedNum;
      toLazyLoadNum = Math.min(expLazyLoadNum, leftNum);
      toLazyLoadIds = waitingPicIds.slice(loadedNum, loadedNum + toLazyLoadNum);
      if(toLazyLoadNum < expLazyLoadNum || leftNum === expLazyLoadNum){
         loadBtn
            .attr('disabled', 'disabled')
            .text('没有更多');
         loadable = false;
      }
      for(let i = 0; i < toLazyLoadNum; i++)
         createTile(toLazyLoadIds[i]);
   });
   
   // when scroll
   function lazyLoadPic(){
      const windowHeight = window.innerHeight;
      for(let i = 0; i < toLazyLoadNum; i++){
         const tileEle = document.getElementById('pic' + toLazyLoadIds[i]);
         const bound = tileEle.getBoundingClientRect();
         if(bound.top <= windowHeight + 100) {
            loadPic(toLazyLoadIds[i]);
         }
      }
   }
   
   const  scrollToLoad = lazyLoadPic.throttle(200);

   $(window).scroll(scrollToLoad);
}


/**
 * process all the events about searching
 * unfinished
 */
function search() {
   const searchBtn = $('#search-btn'),
      searchInput = $('#search input');
   
   searchBtn.click(() => false);
   searchInput.submit(() => false);
}


/**
 * process all the events about sketch modal
 * open the modal
 * enable drawing
 * active buttons
 */
function sketch() {
   CanvasRenderingContext2D.prototype.erase = function(x, y, size) {
      const radius = Math.floor(size * 0.2);
      
      this.beginPath();
      this.globalCompositeOperation = 'destination-out';
      this.fillStyle = 'black';
      this.moveTo(x + radius, y);
      this.arcTo(x + size, y, x + size, y + radius, radius);
      this.arcTo(x + size, y + size, x + size - radius, y + size, radius);
      this.arcTo(x, y + size, x, y + size - radius, radius);
      this.arcTo(x, y, x + radius, y, radius);
      this.fill();
      this.closePath();
      this.globalCompositeOperation = 'source-over';
   };
   
   const cvs = $('#draw-pad'), ctx = document.getElementById('draw-pad').getContext('2d'),
      clearBtn = $('#clear-btn'),
      drawBtn = $('#draw-btn'),
      eraseBtn = $('#erase-btn'),
      eraseBtnP = $('#erase-plus-btn'),
      eraseBtnM = $('#erase-minus-btn'),
      eraser = $('#eraser');
   let isDrawing = true,
      isPressed = false, // is mouse pressed
      isFirstDrop = false; // first drop on each stroke
   
   // open modal
   $('#skt-btn').click((e) => {
      e.preventDefault();
      $('#skt-modal').removeClass('modal-hidden').addClass('modal-shown');
      if(isDrawing)
         cvs.css('cursor', 'url("/static/image/pen_cursor.png"), default');
   });

   drawBtn.click(() => {
      if(isDrawing) return false;
      // update style ...
      eraseBtn.removeClass('chosen');
      drawBtn.addClass('chosen');
      eraseBtnM.removeClass('erasing');
      eraseBtnP.removeClass('erasing');
      cvs.css('cursor', 'url("/static/image/pen_cursor.png"), default');

      isDrawing = true;
   });
   eraseBtn.click(() => {
      if(!isDrawing) return false;
      // update style ...
      drawBtn.removeClass('chosen');
      eraseBtn.addClass('chosen');
      eraseBtnM.addClass('erasing');
      eraseBtnP.addClass('erasing');
      cvs.css('cursor', 'none');
      
      isDrawing = false;
   });

   cvs.mousedown((e) => {
      isPressed = true;
      isFirstDrop = true;
      if(isDrawing)
         ctx.fillRect(e.offsetX, e.offsetY, 1, 1);
      else{
         eraser.addClass('erasing');
         const size = parseInt(eraser.css('width'));
         ctx.erase(e.offsetX, e.offsetY, size);
      }
   }).mouseup(() => {
      isPressed = false;
      ctx.closePath();
      if(!isDrawing)
         eraser.removeClass('erasing');
   }).mouseenter(() => {
      if(!isDrawing){
         //update style ...
         eraser.css('visibility', 'visible');
      }
   }).mouseout(() => {
      isPressed = false;
      //update style ...
      eraser.removeClass('erasing');
      eraser.css('visibility', 'hidden');
   });

   // 1. onChange
   // 2. onMouseEnter then check the value

   // when pen, change cursor, drawable
   // when erase, change cursor, erasable, show two more buttons, let the corresponding image follow the cursor
   
   cvs.mousemove((function (e){
      if(isDrawing && isPressed){
         if(!isFirstDrop)
            ctx.lineTo(e.offsetX, e.offsetY);
         else
            isFirstDrop = false;
         ctx.stroke();
         ctx.moveTo(e.offsetX, e.offsetY);
      }else if(!isDrawing){
         eraser.css({'top': e.offsetY, 'left': e.offsetX});
         if(isPressed){
            const size = parseInt(eraser.css('width'));
            ctx.erase(e.offsetX, e.offsetY, size);
            ctx.beginPath();
         }
      }
   }).throttle(10));

   //deal with eraser
   let canBeLarger = true, canBeSmaller = true;
   eraseBtnP.click(() => {
      if(!canBeLarger) return false;
      let size = eraser.innerWidth();
      if(!canBeSmaller){
         canBeSmaller = true;
         eraseBtnM.removeAttr('disabled');
      }
      size += 8;
      const radius = Math.floor(size * 0.2);
      eraser.css({
         'width': size + 'px',
         'height': size + 'px',
         'borderRadius': radius + 'px'
      });
      if(size === 81){
         canBeLarger = false;
         eraseBtnP.attr('disabled', 'disabled');
      }
   });
   eraseBtnM.click(() => {
      if(!canBeSmaller) return false;
      let size = eraser.innerWidth();
      // 9 17 25 33 41 49 57 65 73 81
      if(!canBeLarger){
         canBeLarger = true;
         eraseBtnP.removeAttr('disabled');
      }
      size -= 8;
      const radius = Math.floor(size * 0.2);
      eraser.css({
         'width': size + 'px',
         'height': size + 'px',
         'borderRadius': radius + 'px'
      });
      if(size === 9){
         canBeSmaller = false;
         eraseBtnM.attr('disabled', 'disabled');
      }
   });
   
   clearBtn.click(() => {
      ctx.clearRect(0, 0, cvs.outerWidth(), cvs.outerHeight());
      ctx.beginPath();
   });
}


/**
 * process all the events about upload modal
 * open the modal
 * show pic and info
 * active buttons
 */
function upload() {
   // open modal
   $('#upload-btn').click((e) => {
      $('#upload-modal').removeClass('modal-hidden').addClass('modal-shown');
   });
   
   const addTagInput = $('#add-tag'), fileTagUl = $('#file-tags');
   //preview & get info
   const fileInput = document.getElementById('up-file'),
      preview = $('#preview'),
      fileNameP = $('#file-name'),
      fileSizeP = $('#file-size');
   fileInput.addEventListener('change', () => {
      fileTagUl.html('');
      fileTags = [];
      if (!fileInput.value) {
         preview.html('<span>图片预览</span>');
         fileNameP.text('未选择文件');
         fileSizeP.text('未知大小');
         return false;
      }
      
      const file = fileInput.files[0];
      fileNameP.text(file.name);
      
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
         fileSizeP.text('格式错误');
         return false;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
         const data = e.target.result,
         img = new Image();
         img.onload = () => {
            fileSizeP.text(img.width + ' x ' + img.height);
         };
         img.src = data;
         preview.html('<img src="' + data + '">');
      };
      // 以DataURL的形式读取文件:
      reader.readAsDataURL(file);
   });
   
   //add tags
   addTagInput.keydown((e) => {
      if(e.keyCode !== 13) return;
      const content = addTagInput.val().trim();
      if(content === '') return false;
      
      //if repeated
      const id = fileTags.indexOf(content);
      if(id >= 0){
         const repeatedLi = fileTagUl.children().eq(id);
         repeatedLi.addClass('repeated-tag');
         setTimeout(() => {
            repeatedLi.removeClass('repeated-tag');
         }, 1000);
         addTagInput.val('');
         return false;
      }
      
      fileTags.push(content);
      console.log('update fileTags: ' + fileTags + ' || ' + fileTags.length);
      const tagLi = $('<li>' + content + '<button class="icon-font tag-rm-btn"></button></li>');
      tagLi.css({'left': '10px', 'opacity': 0});
      fileTagUl.append(tagLi);
      tagLi.animate({'left': 0, 'opacity': 1}, 200);
      addTagInput.val('');
      e.preventDefault();
      // console.log(fileTags);
   });
   
   //remove tags
   let isAnimating = false;
   fileTagUl.delegate('button', 'click', function (e){
      if(isAnimating) return false;
      isAnimating = true;
      const toBeRemoved = $(this).parent(), toBeRmvId = fileTags.indexOf(toBeRemoved.text());
      if(toBeRmvId === -1) return false;
      console.log('tobeRmvd: ' + toBeRmvId + '; ' + fileTags[toBeRmvId]);
      
      //record all the useful info before clear it
      function AniInfo(category, width, fromLeft, originTop, newLineLeft){
         this.category = category; //0 is default, but will surely be changed / 1 is for those which will be on the same line / 2 is for those which will move to the other line
         this.width = width; //the tag's width
         this.fromLeft = fromLeft; //how far it should move on its original line. for cata 1, it's all it have to move; for cata 2, just state 1, for copied tag
         this.originTop = originTop; //which line it used to be on
         this.newLineLeft = newLineLeft; //just for cata 2, how far it should move on the new line
      }
      
      let aniInfos = [];
      const allLi = fileTagUl.children(), lineWidth = 320;
      let ocuppiedLineWidth = 0,  //the distance ocuppied by those that won't move
         lineChangingWidth = toBeRemoved.outerWidth(true),
         leftSpace = 0,
         currentLineTop = toBeRemoved.position().top,  //which line are we dealing with?
         mayChangeLine = false;
      
      for(let i = 0; i < fileTags.length; i++){
         const currentLi = allLi.eq(i), currentLiTop = currentLi.position().top;
         if(currentLiTop < toBeRemoved.position().top || i === toBeRmvId) continue; //tags on the former lines and the removed one won't do the animation
         let liInfo = new AniInfo();
         liInfo.category = 0;
         if(i > toBeRmvId) aniInfos[i] = liInfo; //tags on the same line but before the removed won't be in the collection, but their widths are needed
         liInfo.width = currentLi.outerWidth(true);
         
         //are we still dealing with the same line?
         if(currentLiTop === currentLineTop && !mayChangeLine){ //yes, for those who will stay on the same line
             ocuppiedLineWidth += currentLi.outerWidth(true);
             liInfo.category = 1;
             liInfo.fromLeft = lineChangingWidth;
         }
         else if(currentLiTop !== currentLineTop){ //no
            leftSpace = lineWidth - ocuppiedLineWidth;
            currentLineTop = currentLiTop;
            mayChangeLine = true;  //cuz' the current tag is on the other line
            lineChangingWidth = 0;
         }
         
         //will the element change line?
         if(!mayChangeLine) continue;
         lineChangingWidth += currentLi.outerWidth(true);
         if(lineChangingWidth <= leftSpace) { // yes
            liInfo.category = 2;
            liInfo.fromLeft = currentLi.position().left;
            liInfo.originTop = currentLi.position().top;
            liInfo.newLineLeft = lineWidth - ocuppiedLineWidth - lineChangingWidth + currentLi.outerWidth(true);
         }
         else{
            mayChangeLine = false;
            ocuppiedLineWidth = currentLi.outerWidth(true);
            lineChangingWidth -= currentLi.outerWidth(true);
            liInfo.category = 1;
            liInfo.fromLeft = lineChangingWidth;
         }
      }
      console.log('aniInfos: ');
      console.log(aniInfos);
      //refresh the list and set up those not involved in the animation
      const toBeRmvTop = toBeRemoved.position().top,
         tobeRmvLeft = toBeRemoved.position().left;
      fileTagUl.html('');
      for(let i = 0; i < toBeRmvId; i++)
         fileTagUl.append('<li>' + fileTags[i] + '<button class="icon-font tag-rm-btn"></button></li>');
      
      //execute the animation
      if(toBeRmvId === fileTags.length - 1){  //if it's the last tag that needs to be removed, no animation
         isAnimating = false;
         // return false;
         console.log('========delete at the end========');
      }
      const speed = 0.1;  // we want every tag moves in the same speed, no matter how far it has to move
      let delayTime = 100;
      for(let i = toBeRmvId+1; i < fileTags.length; i++){
         const tagLi = $('<li>' + fileTags[i] + '<button class="icon-font tag-rm-btn"></button></li>'),
            liInfo = aniInfos[i];
         console.log('animating of ' + i + ': ' + fileTags[i]);
         console.log('animating liInfo: ');
         console.log(liInfo || 'undefined');
         
         //will the element stay in the same line?
         if(liInfo.category === 0){      //no tag's animation info category should be 0
            console.log('Error: category is 0');
            return;
         }
         if(liInfo.category === 1){ //yes, in the same line
            tagLi.css('left', liInfo.fromLeft + 'px');
            fileTagUl.append(tagLi);
            tagLi.delay(delayTime).animate({'left': '0'}, liInfo.fromLeft / speed);
         }else{ //no, will change line
            const tagLiCopy = tagLi.clone();
            
            // state 1, move the copy to the left edge
            // and append the origin
            tagLi.css({'left': liInfo.newLineLeft + 'px'});
            tagLiCopy.css({
               'position': 'absolute',
               'left': liInfo.fromLeft + 'px',
               'top': liInfo.originTop + 'px',
               'z-index': 10
            });
            fileTagUl.append(tagLi).append(tagLiCopy);
            tagLiCopy.delay(delayTime).animate({'left': 0}, liInfo.fromLeft / speed,() => {
               // state 2, move the copy until it disappears
               // while move the origin until it totally appears
               tagLiCopy.animate({'left': '-=' + liInfo.width + 'px'}, liInfo.width / speed, () => {
                  tagLiCopy.remove();  // remove it when the animation finishes
               });
               tagLi.animate({'left': 0}, liInfo.newLineLeft / speed);
            });
         }
         
         
         //keep in mind that we're using callback functions to animate the elements,
         //so they won't be called in the same order as we code.
         //thus we have to add up the delayTime to give them a certain order,
         //or the order won't be predicted,
         //and they will seem to start moving at the same time
         delayTime += 50;
         console.log('========turn end=======');
      }
      
      const toBeRemovedCopy = $('<li>' + fileTags[toBeRmvId] + '<button class="icon-font tag-rm-btn"></button></li>');
      toBeRemovedCopy.css({
         'position': 'absolute',
         'left': tobeRmvLeft + 'px',
         'top': toBeRmvTop + 'px'
      });
      fileTagUl.append(toBeRemovedCopy);
      toBeRemovedCopy.animate({'opacity': 0}, 500, () => {
         toBeRemovedCopy.remove();
      });
      
      fileTags.splice(toBeRmvId, 1);
      console.log('after fileTags: ' + fileTags + ' || ' + fileTags.length);
      console.log('************click end***********');
      isAnimating = false;
      e.preventDefault();
   });
   
   $('#up-done-btn').click((e) => {
      e.preventDefault();
      return false;
   });
}


/**
 * tool function, generate the html text of a remark
 * @param rmk
 * @param mode
 * @param byUsr
 * @returns {string}
 */
function createRmkLiTxt(rmk, mode, byUsr = loggedUser){
   let liClass;
   if(mode === 0) liClass = ''; //open detail modal
   else if(mode === 1) liClass = 'new-remark'; //new remark
   else if(mode === 2) liClass = 'old-remark'; //old-remark
   else if(mode === 3) liClass = 'copy-remark'; //copy-remark
   const liTxt =
      '<li class=' + liClass + '>' +
      '   <div class="remark-info">' +
      '      <img class="remark-avatar" src="/media/avatars/' + byUsr.avatar + '"/>' +
      '      <span class="remark-name">' + byUsr.name + '</span>' +
      '   </div>' +
      '   <p class="remark-content">' + rmk.content + '</p>' +
      '</li>';
   return liTxt;
}


/**
 * get a pic id and show the detail of it
 * @param picId
 */
function displayDetail(picId){
   displayingPic = model.pictures[picId];
   displayingRmks = model.remarks.filter((item) => {
      return item.pic_id === picId;
   });
   const usr = model.users[displayingPic.by_id],
      dscp = displayingPic.description === ''? '<span>暂无配文</span>':displayingPic.description;
   
   $('#display img').attr('src', '/media/pictures/' + displayingPic.path);
   $('#author-avatar').attr('src', '/media/avatars/' + usr.avatar);
   $('#author-name').text(usr.name);
   $('#detail-dscp').html(dscp);
   
   if(likedPicIds.includes(picId))
      $('#detail-like-btn').addClass('liked').removeClass('unliked');
   else{
      $('#detail-like-btn').removeClass('liked').addClass('unliked');
   }
   
   const tagUl = $('#detail-tags');
   tagUl.text('');
   displayingPic.tags.forEach((item) => {
      tagUl.append('<li>'+item+'</li>');
   });
   if(displayingPic.tags.length === 0){
      tagUl.html('<span>暂无标签</span>');
   }
   
   const rmkUl = $('#remarks');
   rmkUl.text('');
   displayingRmks.slice().reverse().forEach((item) => {
      rmkUl.append(createRmkLiTxt(item, 0, model.users[item.by_id]));
   });
   
   const last = $('#last-pic'),
      next = $('#next-pic'),
      pos = waitingPicIds.indexOf(picId);
   if(pos === 0){
      last.addClass('to-the-end');
      next.removeClass('to-the-end');
   }else if(pos === loadedNum - 1){
      last.removeClass('to-the-end');
      next.addClass('to-the-end');
   }else{
      last.removeClass('to-the-end');
      next.removeClass('to-the-end');
   }
}


/**
 * process all the events about detail modal
 * open the modal
 * show pic and info
 * active buttons
 */
function detail(){
   const detail = $('#detail-modal');
   
   //open modal
   $('.img-list').delegate('li', 'click', (e) => {
      const node = e.target.nodeName,
         chosenPicId = + e.currentTarget.id.slice(3);
      displayDetail(chosenPicId);
      
      if(node === 'A'
         || node === 'BUTTON'
         || e.target.classList.contains('avatar'))
         return;
      $('body').addClass('body-overlaid');
      $('#modal-overlay').removeClass('no-overlay');
      detail.removeClass('modal-hidden').addClass('modal-shown');
      $('#last-pic').css('visibility', 'visible');
      $('#next-pic').css('visibility', 'visible');
   });
   
   //like or dislike pic
   const detailLikeBtn = $('#detail-like-btn');
   detailLikeBtn.click(() => {
      const likeIndex = likedPicIds.indexOf(displayingPic.id);
      if(likeIndex === -1){
         model.likes.push(new Like(Like.nextId++, loggedUser.id, displayingPic.id));
         displayingPic.like_num ++;
         model.flush('likes');
         model.flush('pictures');
         likedPicIds.push(displayingPic.id);
         detailLikeBtn.addClass('liked');
         $('#pic' + displayingPic.id).find('.like-btn').addClass('liked').text(displayingPic.like_num);
      }else{
         const idInModel = model.likes.findIndex((item) => item.pic_id === displayingPic.id && item.by_id === loggedUser.id);
         model.likes.splice(idInModel, 1);
         displayingPic.like_num --;
         model.flush('likes');
         model.flush('pictures');
         likedPicIds.splice(likeIndex, 1);
         detailLikeBtn.removeClass('liked');
         $('#pic' + displayingPic.id).find('.like-btn').removeClass('liked').text(displayingPic.like_num);
      }
   });
   
   //remark btn
   const remarkTA = $('#add-remark');
   $('#detail-remark-btn').click(() => {
      remarkTA.focus();
   });
   
   //add remark
   let shouldBreak = false;
   const rmkUl = $('#remarks');
   remarkTA.keydown((e) => {
      if(e.keyCode === 16) {
         shouldBreak = true;
      }else if(e.keyCode === 13){
         if(!shouldBreak){
            const content = remarkTA.val().trim().replace(/\n|\r\n/g, '<br/>');
            if(content === '') return;
            const newRmk = new Remark(Remark.id, content, loggedUser.id, displayingPic.id);
            model.remarks.push(newRmk);
            displayingPic.remark_num ++;
            model.flush('remarks');
            model.flush('pictures');
            
            displayingRmks.push(newRmk);
            
            rmkUl.text('');
            const copyRmkLi = $(createRmkLiTxt(newRmk, 3));
            rmkUl.append(copyRmkLi);
            const height = copyRmkLi.outerHeight(true);
            copyRmkLi.remove();
            for(let i = displayingRmks.length-2; i >= 0; i--){
               const oldRmk = displayingRmks[i];
               const oldRmkLi = $(createRmkLiTxt(oldRmk, 2, model.users[oldRmk.by_id]));
               oldRmkLi.css('top', '-'+height+'px');
               rmkUl.append(oldRmkLi);
               oldRmkLi.animate({top: '0'}, 1000);
            }
            const newRmkLi = $(createRmkLiTxt(newRmk, 1));
            rmkUl.prepend(newRmkLi);
            newRmkLi.animate({opacity: 1}, 1000);
            const tileTxt = $('#pic' + displayingPic.id);
            tileTxt.find('.remark-btn').text(displayingPic.remark_num);
            
            remarkTA.val('');
            return false;
         }
      }
   });
   remarkTA.keyup((e) => {
      if(e.keyCode === 16)
         shouldBreak = false;
   });
   
   //download
   // $('#detail-download-btn').click(() => {
   //
   // });
   
   //check tags
   let isTagActive = false;
   const tagBtn = $('#detail-tag-btn'),
      tagUL = $('#detail-tags');

   tagBtn.mousedown((e) => {
      isTagActive = true;
      tagUL.css({
         'top': e.clientY - detail.offset().top + document.body.scrollTop,
         'left': e.clientX - detail.offset().left
      });
      tagUL.removeClass('tags-hidden shown-to-hidden').addClass('tags-shown hidden-to-shown');
   });
   tagBtn.mousemove((e) => {
      // console.log(e.clientX + ', ' + e.clientY + ' ; ' + detail.offset().left + ', ' + detail.offset().top);
      if(!isTagActive) return;
      tagUL.css({
         'top': e.clientY - detail.offset().top + document.body.scrollTop,
         'left': e.clientX - detail.offset().left
      });
   });
   tagBtn.mouseup(() => {
      isTagActive = false;
      tagUL.removeClass('tags-shown hidden-to-shown').addClass('tags-hidden shown-to-hidden');
   });
   tagBtn.mouseout(() => {
      if(!isTagActive) return false;
      isTagActive = false;
      tagUL.removeClass('tags-shown hidden-to-shown').addClass('tags-hidden shown-to-hidden');
   });
   
   //choose next or last
   $('#last-pic').click(() => {
      const pos = waitingPicIds.indexOf(displayingPic.id);
      if(pos <= 0) return;
      displayDetail(waitingPicIds[pos-1]);
   });
   $('#next-pic').click(() => {
      const pos = waitingPicIds.indexOf(displayingPic.id);
      if(pos >= loadedNum-1 || pos < 0) return;
      displayDetail(waitingPicIds[pos+1]);
   });
}


/**
 * active buttons of the tile
 * like
 * comment
 * download
 */
function managePic(){
   $('.img-list').delegate('li', 'click', (e) => {
      const node = e.target,
         chosenPicId = + e.currentTarget.id.slice(3);
      
      if(node.nodeName !== 'BUTTON')
         return;
      
      if(node.classList.contains('like-btn')){
         const likeIndex = likedPicIds.indexOf(chosenPicId);
         if(likeIndex === -1){
            model.likes.push(new Like(Like.nextId++, loggedUser.id, chosenPicId));
            model.pictures.find((item) => item.id === chosenPicId).like_num ++;
            model.flush('likes');
            model.flush('pictures');
            likedPicIds.push(chosenPicId);
            $(node).removeClass('unliked liked-to-unliked').addClass('liked unliked-to-liked').text((+ $(node).text()) + 1);
         }else{
            const idInModel = model.likes.findIndex((item) => item.pic_id === chosenPicId && item.by_id === loggedUser.id);
            model.likes.splice(idInModel, 1);
            model.pictures.find((item) => item.id === chosenPicId).like_num --;
            model.flush('likes');
            model.flush('pictures');
            likedPicIds.splice(likeIndex, 1);
            $(node).removeClass('liked unliked-to-liked').addClass('unliked liked-to-unliked').text((+ $(node).text()) - 1);
         }
      }else if(node.classList.contains('remark-btn')){
         displayDetail(chosenPicId);
         
         $('body').addClass('body-overlaid');
         $('#modal-overlay').removeClass('no-overlay');
         $('#detail-modal').removeClass('modal-hidden').addClass('modal-shown');
         $('#last-pic').css('visibility', 'visible');
         $('#next-pic').css('visibility', 'visible');
         setTimeout(()=> {$('#add-remark').focus();}, 100);
      }else if(node.classList.contains('download-btn')){
      
      }
   });
}
