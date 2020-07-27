document.addEventListener('DOMContentLoaded',()=>{
    let draggables=document.querySelectorAll('.card');
    let container=document.querySelector('.container');

    //setting style for each draggable element
    draggables.forEach(draggable=>{

        //to style when being dragged
        draggable.addEventListener('dragstart',()=>{
            draggable.classList.add('dragging');
        });

        //reset style when dragging stops
        draggable.addEventListener('dragend',()=>{
            draggable.classList.remove('dragging');
        })
    });

    container.addEventListener('dragover',(event)=>{
        // event.preventDefault();
        const afterElement =  getDragAfterElement(container,event.clientX);
        console.log(afterElement)
        const draggable= document.querySelector('.dragging');
        if (afterElement === null){
            container.appendChild(draggable);
        }
        else{
            container.insertBefore(draggable, afterElement);
        }
    });

    function getDragAfterElement(container,x){
        const cards=[...container.querySelectorAll('.card:not(.dragging)')];

        return cards.reduce((closest, card)=>{
            const box = card.getBoundingClientRect();
            let offset = x-box.left-box.width/2;
            console.log(offset);
            if (offset<0 && offset>closest.offset){
                return {offset: offset, element: card}
            }
            else{
                return closest
            }
        },{offset:Number.NEGATIVE_INFINITY}).element;
    };
});
