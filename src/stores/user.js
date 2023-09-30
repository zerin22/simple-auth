import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        currentUser: null
    }),
    actions: {
        register(email, password) {
            const user = this.users.find(user => user.email === email)

            if (user) {
                alert('Email already registered')
                return
            }

            this.users.push({ email, password })
        },
        login(email, password) {
            const user = this.users.find(user => user.email === email && user.password === password)

            if (user) {
                this.currentUser = user
                return user
            }

            return null
        },
        logout() {
            this.currentUser = null
        }
    }
})
