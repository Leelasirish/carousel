window.addEventListener('load', onload);

function onload(){
	var carousels = document.getElementsByClassName('carousel');
	for(var i = 0, len = carousels.length; i < len; i++){
		new Carousel(carousels[i]);
	}
}
function Carousel(carousel){
	this.slide = 0;
	this.carousel = carousel;
	this.widths = [];
	this.initialise();	
	this.disabled = false;			
}
Carousel.prototype.initialise = function(){
	this.carouselContent = this.carousel.getElementsByClassName('carousel-content')[0];
	//this.carouselItems = this.carousel.getElementsByClassName('item');
	this.carouselPrevious = this.carousel.getElementsByClassName('previous')[0];
	this.carouselNext = this.carousel.getElementsByClassName('next')[0];
	this.carouselUl = document.createElement('ul');
	this.carouselUl.className = 'carousel-ul';
	this.carouselCheckBox = this.carousel.getElementsByClassName('check-box')[0];

	var items = this.carousel.getElementsByClassName('item');
	var width = 0;
	for(var i = 0, len = items.length; i < len; i++){

		this.widths[i] = width;
		width += items[i].offsetWidth;
		this.carouselLi = document.createElement('li');
		if( i == 0){
			this.carouselLi.className = 'carousel-li active';	
		}
		else{
			this.carouselLi.className = 'carousel-li';
		}
		this.carouselLi.setAttribute('data-value', i);

		this.carouselUl.appendChild(this.carouselLi);
	}
	this.carouselLis = this.carouselUl.getElementsByClassName('carousel-li');
	this.carousel.appendChild(this.carouselUl);
	this.carouselContent.style.width = width+'px';
	this.boundedPrevious = this.previousHandler.bind(this);
	this.boundedNext = this.nextHandler.bind(this);
	this.boundedIndicator = this.indicatorHandler.bind(this);
	var boundedCheckbox = this.checkboxHandler.bind(this);
	if(this.carouselCheckBox){
		this.carouselCheckBox.addEventListener('click', boundedCheckbox, false);
	}
	this.bindEvents();
}
Carousel.prototype.bindEvents = function(){
	this.carouselPrevious.addEventListener('click', this.boundedPrevious, false);
	this.carouselNext.addEventListener('click', this.boundedNext, false);
	this.carouselUl.addEventListener('click', this.boundedIndicator, false);
}
Carousel.prototype.unbindEvents = function(){
	this.carouselPrevious.removeEventListener('click', this.boundedPrevious, false);
	this.carouselNext.removeEventListener('click', this.boundedNext, false);
	this.carouselUl.removeEventListener('click', this.boundedIndicator, false);
}
Carousel.prototype.checkboxHandler = function(){
	console.log('checkboxHandler called '+this.carouselCheckBox.checked);
	if(this.carouselCheckBox.checked){
		this.unbindEvents();
	}
	else{
		this.bindEvents();
	}
}
Carousel.prototype.previousHandler = function(e){
	console.log('previousHandler called');
	this.slide--;
	if(this.slide < 0){
		this.slide = this.widths.length-1;
	}
	this.slideTo(this.slide);
}
Carousel.prototype.nextHandler = function(){
	console.log('nextHandler called');
	this.slide++;
	if(this.widths.length == this.slide){
		this.slide = 0;
	}
	this.slideTo(this.slide);
}
Carousel.prototype.indicatorHandler = function(e){
	console.log('indicator');
	if(e.target.className.indexOf('carousel-li') < 0){
		return;
	} 
	var indicator = e.target.getAttribute('data-value'); 

	this.slide = indicator;
	
	this.slideTo(this.slide);
}
Carousel.prototype.slideTo = function(index){
	var elements = this.carouselUl.getElementsByClassName('active');
	/*if(elements){
		for(var i = 0, len=elements.length; i < len; i++){
			elements[i].className = 'carousel-li';
		}
	}*/
	elements[0].classList.remove('active');
	//elements = this.carouselUl.getElementsByClassName('carousel-li');
	//elements[index].className = 'carousel-li active';
	this.carouselLis[index].classList.add('active');
	this.carouselContent.style.left = '-'+this.widths[index]+'px';

	// elements[i].classList.remove('active');



}