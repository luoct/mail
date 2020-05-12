let mail = {
    props: ['date', 'herf', 'title'],
    template: `<dd class="pos-right clearfix mail">
                <div class="circ"></div>
                <div class="time">{{ date }}</div>
                <div class="events animated">
                    <div class="events-header"><a :href="mailUrl">{{ title }}</a></div>
                    <div class="events-body">
                        <div class="row">
                            <div class="col-md-6 pull-left">
                                <img class="events-object img-responsive img-rounded"
                                    src="../public/f.png" />
                            </div>
                            <div class="events-desc">
                                ....sd sa d
                            </div>
                        </div>

                    </div>
                    <div class="events-footer  pull-right">
                        <a :href="mailUrl" class="btn read-btn">more</a>
                    </div>
                </div>
            </dd>`,
    data: function () {
        return {
            msg: 'ok',
            mailUrl: '/mails/'+ this.herf
        }
    }
}

let sentence = {
    props: ['date', 'content'],
    template: `<dd class="pos-left clearfix sentence">
                <div class="circ"></div>
                <div class="time">{{ date }}</div>
                <div class="events animated">
                    <div class="events-body">
                        {{ content }}
                    </div>
                </div>
            </dd>`
}