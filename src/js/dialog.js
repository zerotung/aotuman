export default class Dialog {

    confirm({
        title: title,
        content: content,
        cancel: cancel,
        confirm: confirm
    }) {
        let maskDOM = document.createElement('div'),
            wrapDOM = document.createElement('div'),
            titleDOM = document.createElement('div'),
            contentDOM = document.createElement('div'),
            cancelDOM = document.createElement('div'),
            confirmDOM = document.createElement('div');

        let count = 0;

        titleDOM.innerHTML = title;
        contentDOM.innerHTML = content;

        wrapDOM.appendChild(titleDOM);
        wrapDOM.appendChild(contentDOM);

        if (cancel !== undefined) {
            cancelDOM.innerHTML = cancel.title;
            wrapDOM.appendChild(cancelDOM);
            count++;
        }
        if (confirm !== undefined) {
            confirmDOM.innerHTML = confirm.title;
            wrapDOM.appendChild(confirmDOM);
            count++;
        }

        this.addStyle([maskDOM], {
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100%',
            height: '100%',
            position: 'fixed',
            left: '0px',
            top: '0px',
        });

        this.addStyle([wrapDOM], {
            backgroundColor: '#FFF',
            width: '80%',
            padding: '0px',
            borderRadius: '.5em',
            left: '50%',
            top: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
        });

        this.addStyle([titleDOM], {
            textAlign: 'center',
            boxSizing: 'border-box',
            padding: '30px',
            fontSize: '3em',
            color: '#000',
        });

        this.addStyle([contentDOM], {
            fontSize: '2em',
            boxSizing: 'border-box',
            padding: '0px 40px 30px 40px',
            color: '#888',
        });

        this.addStyle([cancelDOM, confirmDOM], {
            // float: 'left',
            display: 'inline-block',
            width: (100 / count) + '%',
            padding: '20px',
            boxSizing: 'border-box',
            textAlign: 'center',
            fontSize: '2em',
            borderTop: '#ccc 1px solid',
        });

        this.addStyle([cancelDOM], {
            borderRight: '#ccc 1px solid',
            color: '#888',
        });

        this.addStyle([confirmDOM], {
            color: '#0F0',
        });

        maskDOM.appendChild(wrapDOM);
        document.body.appendChild(maskDOM);

        cancelDOM.addEventListener('touchstart', () => {
            document.body.removeChild(maskDOM);
            return false;
        });

        confirmDOM.addEventListener('touchstart', () => {
            document.body.removeChild(maskDOM);
            return true;
        });

    }

    addStyle(DOMs, styles) {
        let style = '';
        for (style in styles) {
            DOMs.forEach(DOM => {
                DOM.style[style] = styles[style];
            })
        }
    }
}