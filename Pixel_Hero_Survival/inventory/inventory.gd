extends Area2D

@onready var pick_up: AudioStreamPlayer = $"../AudioStreamPlayerPickUp"
@onready var use: AudioStreamPlayer = $"../AudioStreamPlayerUse"
@onready var world = get_node("/root/World")

signal item_added(item:Item, quantity:int)
signal item_consumed(item_type:Item.ItemType, quantity_left:int)
var inventory = {} ## ESENCIAL ##

func _on_area_entered(area: Area2D) -> void:
	if area is Item:
		#add_item_to_inventory(area)
		world.gold += 25
		area.collect_item()	

func add_item_to_inventory(item: Item):
	pick_up.play()
	if not inventory.has(item.type):
		inventory[item.type] = 1
	else:
		inventory[item.type] = inventory[item.type] + 1
	item_added.emit(item, inventory[item.type])
	prints("Has recogido el objeto de tipo", Item.ItemType.keys()[item.type], "ahora tienes:", inventory[item.type])
	print(inventory)
	
func consume_item_from_inventory(item_type:Item.ItemType):
	use.play()
	if inventory.has(item_type):
		inventory[item_type] = inventory[item_type] - 1
		item_consumed.emit(item_type, inventory[item_type])
		prints("Has consumido el objeto de tipo", Item.ItemType.keys()[item_type], "ahora tienes:", inventory[item_type])
		print(inventory)
		if inventory[item_type] <=0: inventory.erase(item_type)


func _on_inventory_ui_inventory_item_ui_selected(item_type: Item.ItemType):
	consume_item_from_inventory(item_type)
