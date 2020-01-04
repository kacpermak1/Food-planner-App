// carousel - start
const prevButtonEl = document.querySelector(".preview-slide-button");
const nextButtonEl = document.querySelector(".next-slide-button");
const liList = document.querySelectorAll(".carousel li");

const liArrayList = [];
for (let i = 0; i < liList.length; i++)
{
    liArrayList.push(liList[i]);
}

let countSlide = 0;

for (let i = 0; i < liArrayList.length; i++)
{
    if (liArrayList[i].className === "visible-slide")
    {
        countSlide = i;
    }
}

liArrayList[countSlide].classList.add("visible-slide");

nextButtonEl.addEventListener("click", function ()
{
    if(countSlide === liArrayList.length-1)
    {
        liArrayList[countSlide].classList.remove("visible-slide");
        countSlide = 0;
        liArrayList[countSlide].classList.add("visible-slide");
    }
    else if(0 < countSlide < liArrayList.length-1)
    {
        liArrayList[countSlide].classList.remove("visible-slide");
        countSlide++;
        liArrayList[countSlide].classList.add("visible-slide");
    }
});

prevButtonEl.addEventListener("click", function ()
{
    if(countSlide === 0)
    {
        liArrayList[countSlide].classList.remove("visible-slide");
        countSlide = liArrayList.length-1;
        liArrayList[countSlide].classList.add("visible-slide");
    }
    else if(liArrayList.length-1 >= countSlide > 0)
    {
        liArrayList[countSlide].classList.remove("visible-slide");
        countSlide--;
        liArrayList[countSlide].classList.add("visible-slide");
    }
});
// carousel - end
