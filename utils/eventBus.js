class EventBus {
	events = {};
	$on(type,fn) {
		this.events[type] = this.events[type] || [];
		this.events[type].push(fn);
	}
	$emit(type,data) {
		if(this.events[type] && this.events[type].length) {
			this.events[type].forEach((fn)=>{
				fn(data);
			})
		}
	}
	$off(type) {
		this.events[type] = [];
	}
}
export default new EventBus();
