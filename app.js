Vue.createApp({
    data() {
        return {
            title: 'Vue<strong>Tracker</strong>',
            logoSource: './vue.svg',
            tasks: [],
            taskID: 0,
            taskname: '',
            isTaskInProgress: false,
            startTime: null,
            errorMsg: null
        }
    },
    methods: {

        startTask() {

            // Vérification de la présence d'une tâche en cours
            if (this.taskname.length === 0) {
                this.errorMsg = 'Veuillez saisir un nom de tâche';
                return
            }
            else if (this.isTaskInProgress) {
                this.errorMsg = 'Une tâche est déjà en cours';
                return
            } else {
                this.errorMsg = null;
            }
            // Démarrage de la tâche
            this.isTaskInProgress = true
            this.startTime = Date.now()
        },

        stopTask() {

            // Vérification de la présence d'une tâche en cours
            if (!this.isTaskInProgress) {
                this.errorMsg = 'Aucune tâche n\'est en cours';
                return
            }

            // Enregistrement de la tâche
            this.tasks.unshift({
                id: this.getAnID(),
                name: this.taskname,
                start: this.startTime,
                end: Date.now()
            })

            // Fin de la tâche
            this.isTaskInProgress = false
            this.errorMsg = null
            this.taskname = ''
        },

        getAnID() {

            this.taskID++
            return this.taskID
        }
    }
}).mount('#app')

