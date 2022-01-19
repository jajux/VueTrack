Vue.createApp({
    data() {
        return {
            title: 'Vue<strong>Tracker</strong>',
            logoSource: './vue.svg',
            tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit', }),
            tasks: [],
            taskID: 0,
            taskname: '',
            isTaskInProgress: false,
            startTime: null,
            nowTime: null,
            intervalEverySecond: null,
            errorMsg: null
        }
    },

    computed: {
        currentDuration () {
          if (this.startTime && this.nowTime) {
            return this.durationBetweenTimestamps(this.startTime, this.nowTime)
          } else {
            return '00:00:00'
          }
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
            this.nowTime = Date.now()
            this.intervalEverySecond = setInterval(() => {
                this.nowTime = Date.now()
            }, 1000)
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
            clearInterval(this.intervalEverySecond)
            this.isTaskInProgress = false
            this.errorMsg = null
            this.nowTime = null
            this.taskname = ''
        },

        getAnID() {

            this.taskID++
            return this.taskID
        },

        formatTimestamp(ts) {
            
            return this.tsFormatter.format(ts)
        },

        durationBetweenTimestamps(start, end) {

            let seconds = Math.floor((end / 1000) - (start / 1000))
            let minutes = Math.floor(seconds / 60)
            const hours = Math.floor(minutes / 60)
            seconds = seconds % 60
            minutes = minutes % 60
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }
    }
}).mount('#app')

